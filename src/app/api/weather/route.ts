
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.ACCUWEATHER_API_KEY;
  // Default to New York City (Location Key: 349727)
  const locationKey = "349727"; 
  
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
  }

  try {
    // Fetch Current Conditions
    const currentRes = await fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
    );
    const currentData = await currentRes.json();

    // Fetch Daily Forecast (1 Day)
    const forecastRes = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}&metric=true`
    );
    const forecastData = await forecastRes.json();

    return NextResponse.json({
      city: "New York",
      current: currentData[0],
      forecast: forecastData.DailyForecasts[0]
    });
  } catch (error) {
    console.error("Weather sync failed:", error);
    // Return mock fallback if API fails or key is invalid for this endpoint
    return NextResponse.json({
      city: "New York",
      current: {
        WeatherText: "Clear Path Sky",
        Temperature: { Metric: { Value: 22 } },
        WeatherIcon: 1
      },
      forecast: {
        Temperature: { 
          Minimum: { Value: 18 }, 
          Maximum: { Value: 26 } 
        }
      }
    });
  }
}

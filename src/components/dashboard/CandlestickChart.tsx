"use client"

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dynamic import to avoid SSR issues with ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function CandlestickChart() {
  const chartData = useMemo(() => {
    const series = [{
      data: [
        { x: new Date(2023, 1, 1), y: [6629.81, 6650.5, 6623.04, 6633.33] },
        { x: new Date(2023, 1, 2), y: [6632.01, 6643.59, 6620, 6630.11] },
        { x: new Date(2023, 1, 3), y: [6630.71, 6648.95, 6623.34, 6635.65] },
        { x: new Date(2023, 1, 4), y: [6635.65, 6651, 6629.67, 6638.24] },
        { x: new Date(2023, 1, 5), y: [6638.24, 6640, 6620, 6624.47] },
        { x: new Date(2023, 1, 6), y: [6624.53, 6636.03, 6621.61, 6631.31] },
        { x: new Date(2023, 1, 7), y: [6631.31, 6645.5, 6610.12, 6640.4] },
        { x: new Date(2023, 1, 8), y: [6640.4, 6648.5, 6630.12, 6635.4] },
        { x: new Date(2023, 1, 9), y: [6635.4, 6650, 6625.12, 6645.4] },
        { x: new Date(2023, 1, 10), y: [6645.4, 6660, 6640.12, 6655.4] },
        { x: new Date(2023, 1, 11), y: [6655.4, 6670, 6650.12, 6665.4] },
        { x: new Date(2023, 1, 12), y: [6665.4, 6680, 6660.12, 6675.4] }
      ]
    }];

    const options: any = {
      chart: {
        type: 'candlestick',
        height: 350,
        toolbar: {
          show: false
        },
        background: 'transparent'
      },
      title: {
        show: false
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: 'hsl(var(--muted-foreground))'
          }
        }
      },
      yaxis: {
        tooltip: {
          enabled: true
        },
        labels: {
          style: {
            colors: 'hsl(var(--muted-foreground))'
          }
        }
      },
      grid: {
        borderColor: 'hsl(var(--border))',
        strokeDashArray: 4
      },
      theme: {
        mode: 'light' // Controlled via container context if needed
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#22c55e',
            downward: '#ef4444'
          }
        }
      }
    };

    return { series, options };
  }, []);

  return (
    <Card className="h-full border-none shadow-none bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-headline">Analytic Feed</CardTitle>
        <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest text-primary">Live Data</Badge>
      </CardHeader>
      <CardContent className="h-[calc(100%-80px)] pt-4">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="candlestick"
          height="100%"
          width="100%"
        />
      </CardContent>
    </Card>
  );
}
"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexChartType, MarketHistoryPoint } from "./market-watch-types";
import { normalizeToApex } from "./market-watch-normalize";

// Dynamically import to avoid SSR issues with window object in ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  data: MarketHistoryPoint[];
  symbol: string;
  type?: ApexChartType;
}

export function MarketWatchChart({ data, symbol, type = 'candlestick' }: Props) {
  const series = useMemo(() => [{
    name: symbol,
    data: normalizeToApex(data, type)
  }], [data, type, symbol]);

  const options: any = {
    chart: {
      type: type,
      background: 'transparent',
      foreColor: 'rgba(255,255,255,0.5)',
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 500
        }
      },
      sparkline: {
        enabled: false
      }
    },
    theme: { mode: 'dark' },
    stroke: {
      width: type === 'line' || type === 'area' ? 2 : 1,
      curve: 'smooth'
    },
    grid: {
      borderColor: 'rgba(255,255,255,0.05)',
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 0
      }
    },
    xaxis: {
      type: 'datetime',
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          fontSize: '10px',
          fontWeight: 700,
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        style: {
          fontSize: '10px',
          fontWeight: 700,
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    tooltip: {
      theme: 'dark',
      x: { format: 'dd MMM HH:mm' }
    },
    colors: ['#00e5ff'],
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#00e5ff',
          downward: '#ff003c'
        },
        wick: { useFillColor: true }
      }
    },
    fill: {
      type: type === 'area' ? 'gradient' : 'solid',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100]
      }
    }
  };

  return (
    <div className="w-full h-full min-h-[280px] p-2">
      <Chart options={options} series={series} type={type} height="100%" width="100%" />
    </div>
  );
}

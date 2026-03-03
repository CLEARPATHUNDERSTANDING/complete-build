"use client";

import dynamic from "next/dynamic";
import { type ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  series: number[];
  positive: boolean;
};

export default function MarketMiniChart({ series, positive }: Props) {
  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      sparkline: { enabled: true },
      animations: { enabled: true }
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.45,
        opacityTo: 0.03,
        stops: [0, 100]
      }
    },
    dataLabels: { enabled: false },
    tooltip: { theme: "dark" },
    grid: { show: false },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { show: false },
    colors: [positive ? "#22d3ee" : "#f43f5e"],
  };

  const chartSeries = [{ name: "Value", data: series }];

  return (
    <div className="h-24 w-full">
      <Chart options={options} series={chartSeries} type="area" height="100%" width="100%" />
    </div>
  );
}

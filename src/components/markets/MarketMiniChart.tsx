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
    yaxis: {
      labels: { show: false }
    },
    theme: { mode: "dark" },
    colors: positive ? ["#22d3ee"] : ["#f472b6"]
  };

  return (
    <div className="h-28 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      <Chart
        options={options}
        series={[{ name: "value", data: series }]}
        type="area"
        height="100%"
        width="100%"
      />
    </div>
  );
}

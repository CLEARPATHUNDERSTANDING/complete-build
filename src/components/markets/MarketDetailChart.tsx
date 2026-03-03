"use client";

import dynamic from "next/dynamic";
import { type ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  title: string;
  data: { time: string; value: number }[];
};

export default function MarketDetailChart({ title, data }: Props) {
  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: true }
    },
    theme: { mode: "dark" },
    stroke: { curve: "smooth", width: 3 },
    dataLabels: { enabled: false },
    grid: { borderColor: "rgba(255,255,255,0.08)" },
    xaxis: {
      categories: data.map((d) => d.time),
      labels: { show: false }
    },
    yaxis: {
      labels: {
        style: { colors: "#94a3b8" }
      }
    },
    tooltip: { theme: "dark" },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 100]
      }
    },
    colors: ["#22d3ee"]
  };

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_0_40px_rgba(34,211,238,0.15)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-300">
          Apex Live Panel
        </span>
      </div>

      <Chart
        options={options}
        series={[{ name: title, data: data.map((d) => d.value) }]}
        type="area"
        height={360}
      />
    </div>
  );
}

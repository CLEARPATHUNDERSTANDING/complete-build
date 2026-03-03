import type { ApexChartType, MarketSeries, OhlcPoint } from "./market-watch-types";

function n(v: number | undefined): number {
  return Number.isFinite(v) ? (v as number) : 0;
}

export function normalizeForApex(chartType: ApexChartType, points: OhlcPoint[]): MarketSeries {
  const sorted = [...points].sort((a, b) => a.t - b.t);

  if (chartType === "candlestick") {
    return {
      kind: "candle",
      series: [
        {
          data: sorted.map((p) => ({
            x: p.t,
            y: [n(p.o), n(p.h), n(p.l), n(p.c)],
          })),
        },
      ],
    };
  }

  if (chartType === "line" || chartType === "area" || chartType === "scatter") {
    return {
      kind: "xy",
      series: [{ name: "Close", data: sorted.map((p) => ({ x: p.t, y: n(p.c) })) }],
    };
  }

  if (chartType === "bar") {
    const hasVol = sorted.some((p) => typeof p.v === "number");
    return {
      kind: "xy",
      series: [
        {
          name: hasVol ? "Volume" : "Close",
          data: sorted.map((p) => ({ x: p.t, y: n(hasVol ? p.v : p.c) })),
        },
      ],
    };
  }

  if (chartType === "rangeBar") {
    const fmt = (t: number) => new Date(t).toISOString().slice(0, 10);
    return {
      kind: "rangeBar",
      series: [
        {
          data: sorted.map((p) => ({
            x: fmt(p.t),
            y: [n(p.l), n(p.h)],
          })),
        },
      ],
    };
  }

  if (chartType === "heatmap") {
    const byDay = new Map<string, OhlcPoint[]>();
    for (const p of sorted) {
      const day = new Date(p.t).toISOString().slice(0, 10);
      byDay.set(day, [...(byDay.get(day) ?? []), p]);
    }

    const series = Array.from(byDay.entries())
      .slice(-14)
      .map(([day, ps]) => {
        const buckets = new Map<string, number>();
        for (const pt of ps) {
          const hr = String(new Date(pt.t).getUTCHours()).padStart(2, "0");
          const key = `${hr}:00`;
          const range = Math.abs(n(pt.h) - n(pt.l));
          buckets.set(key, (buckets.get(key) ?? 0) + range);
        }
        return {
          name: day,
          data: Array.from(buckets.entries()).map(([x, y]) => ({ x, y: n(y) })),
        };
      });

    return { kind: "heatmap", series };
  }

  if (chartType === "treemap") {
    const items = sorted
      .slice(-50)
      .map((p) => ({
        x: new Date(p.t).toISOString().slice(5, 16).replace("T", " "),
        y: Math.abs(n(p.c) - n(p.o)),
      }))
      .sort((a, b) => b.y - a.y)
      .slice(0, 12);

    return { kind: "treemap", series: [{ data: items }] };
  }

  if (chartType === "pie" || chartType === "donut" || chartType === "radialBar") {
    const recent = sorted.slice(-150);
    let up = 0;
    let down = 0;
    let flat = 0;
    for (const p of recent) {
      if (p.c > p.o) up++;
      else if (p.c < p.o) down++;
      else flat++;
    }
    const labels = ["Up", "Down", "Flat"];
    const series = [up, down, flat];

    if (chartType === "radialBar") return { kind: "radial", labels, series };
    return { kind: "pie", labels, series };
  }

  if (chartType === "boxPlot") {
    const window = 20;
    const fmt = (t: number) => new Date(t).toISOString().slice(5, 10);
    const data: Array<{ x: string; y: [number, number, number, number, number] }> = [];

    for (let i = window; i < sorted.length; i += window) {
      const slice = sorted
        .slice(i - window, i)
        .map((p) => n(p.c))
        .sort((a, b) => a - b);

      const min = slice[0] ?? 0;
      const max = slice[slice.length - 1] ?? 0;
      const q1 = slice[Math.floor(slice.length * 0.25)] ?? min;
      const med = slice[Math.floor(slice.length * 0.5)] ?? min;
      const q3 = slice[Math.floor(slice.length * 0.75)] ?? max;

      data.push({ x: fmt(sorted[i - 1].t), y: [min, q1, med, q3, max] });
    }

    return { kind: "boxPlot", series: [{ data }] };
  }

  return {
    kind: "xy",
    series: [{ name: "Close", data: sorted.map((p) => ({ x: p.t, y: n(p.c) })) }],
  };
}

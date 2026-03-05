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

  if (chartType === "line" || chartType === "area" || chartType === "scatter" || chartType === "column") {
    return {
      kind: "xy",
      series: [{ name: "Close", data: sorted.map((p) => ({ x: p.t, y: n(p.c) })) }],
    };
  }

  if (chartType === "bar") {
    return {
      kind: "xy",
      series: [{ name: "Close", data: sorted.slice(-20).map((p) => ({ x: p.t, y: n(p.c) })) }],
    };
  }

  if (chartType === "rangeArea") {
    return {
      kind: "rangeArea",
      series: [
        {
          name: "High-Low Range",
          data: sorted.map((p) => ({
            x: p.t,
            y: [n(p.l), n(p.h)],
          })),
        },
      ],
    };
  }

  if (chartType === "rangeBar" || chartType === "funnel") {
    const fmt = (t: number) => new Date(t).toISOString().slice(11, 16);
    return {
      kind: "rangeBar",
      series: [
        {
          data: sorted.slice(-15).map((p) => ({
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
      const day = new Date(p.t).toISOString().slice(5, 10);
      byDay.set(day, [...(byDay.get(day) ?? []), p]);
    }

    const series = Array.from(byDay.entries())
      .slice(-7)
      .map(([day, ps]) => {
        return {
          name: day,
          data: ps.slice(-12).map((pt) => ({ 
            x: new Date(pt.t).getHours() + ":00", 
            y: Math.round(Math.abs(n(pt.c) - n(pt.o)) * 100) 
          })),
        };
      });

    return { kind: "heatmap", series };
  }

  if (chartType === "treemap") {
    const items = sorted
      .slice(-12)
      .map((p) => ({
        x: new Date(p.t).toISOString().slice(11, 16),
        y: Math.round(n(p.c)),
      }))
      .sort((a, b) => b.y - a.y);

    return { kind: "treemap", series: [{ data: items }] };
  }

  if (chartType === "pie" || chartType === "donut" || chartType === "radialBar") {
    const recent = sorted.slice(-50);
    let up = 0, down = 0, flat = 0;
    for (const p of recent) {
      if (p.c > p.o) up++;
      else if (p.c < p.o) down++;
      else flat++;
    }
    return { 
      kind: chartType === "radialBar" ? "radial" : "pie", 
      labels: ["Bullish", "Bearish", "Neutral"], 
      series: [up, down, flat] 
    };
  }

  if (chartType === "radar") {
    const last = sorted.slice(-1)[0] || { o: 0, h: 0, l: 0, c: 0 };
    return {
      kind: "radar",
      labels: ["Open", "High", "Low", "Close", "Volume Offset"],
      series: [{ 
        name: "Current Terminal", 
        data: [n(last.o), n(last.h), n(last.l), n(last.c), 50] 
      }]
    };
  }

  if (chartType === "boxPlot") {
    const window = 10;
    const fmt = (t: number) => new Date(t).toISOString().slice(11, 16);
    const data: any[] = [];

    for (let i = window; i < sorted.length; i += window) {
      const slice = sorted.slice(i - window, i).map(p => n(p.c)).sort((a, b) => a - b);
      const min = slice[0], max = slice[slice.length - 1];
      const q1 = slice[Math.floor(slice.length * 0.25)];
      const med = slice[Math.floor(slice.length * 0.5)];
      const q3 = slice[Math.floor(slice.length * 0.75)];
      data.push({ x: fmt(sorted[i - 1].t), y: [min, q1, med, q3, max] });
    }

    return { kind: "boxPlot", series: [{ data }] };
  }

  return {
    kind: "xy",
    series: [{ name: "Close", data: sorted.map((p) => ({ x: p.t, y: n(p.c) })) }],
  };
}

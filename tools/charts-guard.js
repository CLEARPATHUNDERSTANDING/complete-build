const fs = require("fs");
const path = require("path");

const forbidden = [
  "lightweight-charts",
  "tradingview",
  "react-chartjs-2",
  "chart.js",
  "highcharts",
  "echarts",
  "recharts",
  "victory",
  "d3",
];

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

const hits = forbidden.filter((k) => deps[k]);
if (hits.length) {
  console.error("FORBIDDEN CHART DEPENDENCIES FOUND:", hits.join(", "));
  process.exit(1);
}

console.log("OK: Only ApexCharts chart stack detected.");
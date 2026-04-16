import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TrendPoint } from "../data";

type Props = { data: TrendPoint[] };

export function RevenueChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="tpvFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4361ee" stopOpacity={0.32} />
            <stop offset="100%" stopColor="#4361ee" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis
          yAxisId="left"
          tickLine={false}
          axisLine={false}
          fontSize={12}
          tickFormatter={(v) => `$${v}M`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickLine={false}
          axisLine={false}
          fontSize={12}
          tickFormatter={(v) => `$${v}M`}
        />
        <Tooltip
          formatter={(value: number, name: string) => {
            if (name === "TPV") return [`$${value}M`, "TPV"];
            if (name === "Net Revenue") return [`$${value}M`, "Net Revenue"];
            return [value, name];
          }}
        />
        <Legend />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="tpv"
          name="TPV"
          stroke="#4361ee"
          strokeWidth={2}
          fill="url(#tpvFill)"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="revenue"
          name="Net Revenue"
          stroke="#7048e8"
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

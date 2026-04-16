import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { ProductMix } from "../data";

type Props = { data: ProductMix[] };

export function ProductMixChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={92}
          paddingAngle={2}
        >
          {data.map((slice) => (
            <Cell key={slice.name} fill={slice.color} stroke="#fff" />
          ))}
        </Pie>
        <Tooltip formatter={(v: number) => `${v}%`} />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: 12 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

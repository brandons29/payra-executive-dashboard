import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ClayIcon from "@clayui/icon";
import type { Ga4Snapshot } from "../sources/ga4";

type Props = { data: Ga4Snapshot };

function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function Ga4Panel({ data }: Props) {
  const isUp = data.sessionsDeltaPct >= 0;

  return (
    <div className="panel">
      <div className="panel__head">
        <div>
          <h3 className="panel__title">Acquisition · GA4</h3>
          <p className="panel__sub">payra.com — last 28 days</p>
        </div>
        <span className="health-pill health-pill--ok">Live source: GA4</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <MiniStat
          label="Sessions"
          value={formatNumber(data.sessions)}
          delta={`${isUp ? "+" : ""}${data.sessionsDeltaPct.toFixed(1)}%`}
          good={isUp}
        />
        <MiniStat
          label="Engaged rate"
          value={`${data.engagedSessionRate.toFixed(1)}%`}
        />
        <MiniStat
          label="Signup conv."
          value={`${data.signupConversionRate.toFixed(1)}%`}
        />
        <MiniStat
          label="Avg. duration"
          value={`${Math.floor(data.avgSessionDurationSec / 60)}m ${
            data.avgSessionDurationSec % 60
          }s`}
        />
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={data.weeklySessions}
          margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" vertical={false} />
          <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={11} />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => formatNumber(v)}
          />
          <Tooltip formatter={(v: number) => formatNumber(v)} />
          <Bar dataKey="sessions" fill="#4361ee" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div style={{ marginTop: 16 }}>
        <div
          style={{
            fontSize: 12,
            color: "var(--payra-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 8,
          }}
        >
          Top channels
        </div>
        {data.topChannels.map((c) => (
          <div className="legend-row" key={c.channel}>
            <span>
              <ClayIcon symbol="globe" /> &nbsp;{c.channel}
            </span>
            <span style={{ color: "var(--payra-muted)" }}>
              {formatNumber(c.sessions)} · {c.share}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  delta,
  good,
}: {
  label: string;
  value: string;
  delta?: string;
  good?: boolean;
}) {
  return (
    <div
      style={{
        background: "#f7f8fb",
        borderRadius: 10,
        padding: "12px",
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "var(--payra-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{value}</div>
      {delta ? (
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: good ? "var(--payra-positive)" : "var(--payra-negative)",
          }}
        >
          {delta}
        </div>
      ) : null}
    </div>
  );
}

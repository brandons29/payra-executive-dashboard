import type { HubspotSnapshot } from "../sources/hubspot";

type Props = { data: HubspotSnapshot };

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

export function HubspotPanel({ data }: Props) {
  const maxStageValue = Math.max(...data.stages.map((s) => s.value));

  return (
    <div className="panel">
      <div className="panel__head">
        <div>
          <h3 className="panel__title">Pipeline · HubSpot</h3>
          <p className="panel__sub">Open deals across all stages</p>
        </div>
        <span className="health-pill health-pill--ok">Live source: HubSpot</span>
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
          label="Open pipeline"
          value={formatCurrency(data.pipelineValue)}
          delta={`+${data.pipelineDeltaPct.toFixed(1)}%`}
          good
        />
        <MiniStat
          label="Weighted"
          value={formatCurrency(data.weightedPipeline)}
        />
        <MiniStat
          label="MQL → SQL"
          value={`${data.mqlToSqlRate.toFixed(1)}%`}
        />
        <MiniStat
          label="Sales cycle"
          value={`${data.avgSalesCycleDays}d`}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.stages.map((s) => (
          <div key={s.stage}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              <span>
                <span
                  className="legend-dot"
                  style={{ background: s.color }}
                />
                {s.stage}
              </span>
              <span style={{ color: "var(--payra-muted)" }}>
                {s.deals} deals · {formatCurrency(s.value)}
              </span>
            </div>
            <div
              style={{
                height: 10,
                background: "#eef0f4",
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(s.value / maxStageValue) * 100}%`,
                  height: "100%",
                  background: s.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <div
          style={{
            fontSize: 12,
            color: "var(--payra-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 8,
          }}
        >
          Top open deals
        </div>
        <table className="simple-table">
          <thead>
            <tr>
              <th>Account</th>
              <th>Stage</th>
              <th>Value</th>
              <th>Owner</th>
              <th>Close</th>
            </tr>
          </thead>
          <tbody>
            {data.topDeals.map((d) => (
              <tr key={d.name}>
                <td style={{ fontWeight: 600 }}>{d.name}</td>
                <td>{d.stage}</td>
                <td>{formatCurrency(d.value)}</td>
                <td>{d.owner}</td>
                <td>{d.closeDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

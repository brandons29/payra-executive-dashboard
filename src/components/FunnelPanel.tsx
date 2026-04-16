import type { Ga4Snapshot } from "../sources/ga4";

type Props = { funnel: Ga4Snapshot["funnel"] };

export function FunnelPanel({ funnel }: Props) {
  const top = funnel[0]?.users ?? 1;

  return (
    <div className="panel">
      <div className="panel__head">
        <div>
          <h3 className="panel__title">GA4 → Activation funnel</h3>
          <p className="panel__sub">Visit → first settled transaction</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {funnel.map((step, idx) => {
          const pctOfTop = (step.users / top) * 100;
          const conversion = idx === 0 ? null : (step.users / funnel[idx - 1].users) * 100;
          return (
            <div key={step.step}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                <span>{step.step}</span>
                <span style={{ color: "var(--payra-muted)" }}>
                  {step.users.toLocaleString()}
                  {conversion !== null ? (
                    <span style={{ marginLeft: 8, color: "#4361ee" }}>
                      ↳ {conversion.toFixed(1)}%
                    </span>
                  ) : null}
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
                    width: `${pctOfTop}%`,
                    height: "100%",
                    background:
                      "linear-gradient(90deg, #4361ee 0%, #7048e8 100%)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

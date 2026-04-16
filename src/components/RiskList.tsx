import type { RiskAlert } from "../data";

type Props = { alerts: RiskAlert[] };

const labelMap: Record<RiskAlert["severity"], string> = {
  ok: "Healthy",
  warn: "Watch",
  bad: "Critical",
};

export function RiskList({ alerts }: Props) {
  return (
    <div>
      {alerts.map((a) => (
        <div
          key={a.id}
          style={{
            display: "flex",
            gap: 12,
            padding: "12px 0",
            borderBottom: "1px solid #f0f0f4",
          }}
        >
          <span className={`health-pill health-pill--${a.severity}`}>
            {labelMap[a.severity]}
          </span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{a.title}</div>
            <div style={{ color: "var(--payra-muted)", fontSize: 13 }}>
              {a.detail}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

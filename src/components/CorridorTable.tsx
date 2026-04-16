import type { CorridorRow } from "../data";

type Props = { rows: CorridorRow[] };

export function CorridorTable({ rows }: Props) {
  return (
    <table className="simple-table">
      <thead>
        <tr>
          <th>Corridor</th>
          <th>Volume (M)</th>
          <th>Share</th>
          <th>MoM Growth</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.corridor}>
            <td style={{ fontWeight: 600 }}>{r.corridor}</td>
            <td>${r.volume}M</td>
            <td>
              <span
                style={{
                  display: "inline-block",
                  background: "#eef0fe",
                  color: "#4361ee",
                  padding: "2px 8px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {r.share}%
              </span>
            </td>
            <td
              style={{
                color: r.growth >= 0 ? "var(--payra-positive)" : "var(--payra-negative)",
                fontWeight: 600,
              }}
            >
              {r.growth >= 0 ? "+" : ""}
              {r.growth.toFixed(1)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import ClayIcon from "@clayui/icon";
import type { Kpi } from "../data";

type Props = { kpi: Kpi };

export function KpiCard({ kpi }: Props) {
  const goodDirection = kpi.positiveIsGood ?? true;
  const isUp = kpi.delta >= 0;
  const isGood = goodDirection ? isUp : !isUp;
  const deltaClass = isGood ? "kpi-card__delta--up" : "kpi-card__delta--down";
  const arrow = isUp ? "caret-top" : "caret-bottom";

  return (
    <div className="kpi-card">
      <div className="kpi-card__head">
        <span>{kpi.label}</span>
      </div>
      <div className="kpi-card__value">{kpi.value}</div>
      <div className={`kpi-card__delta ${deltaClass}`}>
        <ClayIcon symbol={arrow} />
        {Math.abs(kpi.delta).toFixed(2)}% {kpi.deltaLabel}
      </div>
      <div className="kpi-card__sub">{kpi.helper}</div>
    </div>
  );
}

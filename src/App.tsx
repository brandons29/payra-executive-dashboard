import { useEffect, useState } from "react";
import ClayIcon, { ClayIconSpriteContext } from "@clayui/icon";

import { KpiCard } from "./components/KpiCard";
import { RevenueChart } from "./components/RevenueChart";
import { ProductMixChart } from "./components/ProductMixChart";
import { CorridorTable } from "./components/CorridorTable";
import { RiskList } from "./components/RiskList";
import { Ga4Panel } from "./components/Ga4Panel";
import { FunnelPanel } from "./components/FunnelPanel";
import { HubspotPanel } from "./components/HubspotPanel";

import { kpis, trend, corridors, productMix, riskAlerts } from "./data";
import { fetchGa4Snapshot, type Ga4Snapshot } from "./sources/ga4";
import { fetchHubspotSnapshot, type HubspotSnapshot } from "./sources/hubspot";

const SPRITEMAP =
  "https://cdn.jsdelivr.net/npm/@clayui/css@3.124.0/lib/images/icons/icons.svg";

const RANGES = ["7D", "30D", "QTD", "YTD"] as const;
type Range = (typeof RANGES)[number];

export function App() {
  const [range, setRange] = useState<Range>("30D");
  const [ga4, setGa4] = useState<Ga4Snapshot | null>(null);
  const [hubspot, setHubspot] = useState<HubspotSnapshot | null>(null);

  useEffect(() => {
    fetchGa4Snapshot().then(setGa4);
    fetchHubspotSnapshot().then(setHubspot);
  }, []);

  return (
    <ClayIconSpriteContext.Provider value={SPRITEMAP}>
      <div className="brand-bar">
        <div className="brand-mark">P</div>
        <div>
          <div className="brand-name">Payra</div>
          <div style={{ fontSize: 12, color: "var(--payra-muted)" }}>
            Executive command center
          </div>
        </div>
        <div className="brand-tag">
          Sources: Payra core ledger · Google Analytics 4 · HubSpot CRM
        </div>
      </div>

      <main className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">C-Suite KPI Dashboard</h1>
            <p className="dashboard-subtitle">
              Live snapshot for the Payra leadership team — refreshed hourly.
            </p>
          </div>
          <div className="range-toggle" role="tablist">
            {RANGES.map((r) => (
              <button
                key={r}
                className={r === range ? "active" : ""}
                onClick={() => setRange(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </header>

        <section className="kpi-grid">
          {kpis.map((k) => (
            <KpiCard key={k.id} kpi={k} />
          ))}
        </section>

        <section className="panel-grid">
          <div className="panel">
            <div className="panel__head">
              <div>
                <h3 className="panel__title">TPV & Net Revenue — last 12 months</h3>
                <p className="panel__sub">
                  Volume in $M (left) · Revenue in $M (right)
                </p>
              </div>
              <span className="health-pill health-pill--ok">
                <ClayIcon symbol="check-circle" /> On plan
              </span>
            </div>
            <RevenueChart data={trend} />
          </div>

          <div className="panel">
            <div className="panel__head">
              <div>
                <h3 className="panel__title">Product mix</h3>
                <p className="panel__sub">% of net revenue, trailing 30 days</p>
              </div>
            </div>
            <ProductMixChart data={productMix} />
          </div>
        </section>

        <section className="split-grid">
          <div className="panel">
            <div className="panel__head">
              <div>
                <h3 className="panel__title">Top corridors</h3>
                <p className="panel__sub">By payment volume, last 30 days</p>
              </div>
            </div>
            <CorridorTable rows={corridors} />
          </div>

          <div className="panel">
            <div className="panel__head">
              <div>
                <h3 className="panel__title">Risk & compliance signals</h3>
                <p className="panel__sub">
                  Acquirer health, scheme thresholds, audits
                </p>
              </div>
            </div>
            <RiskList alerts={riskAlerts} />
          </div>
        </section>

        <section className="split-grid">
          {ga4 ? <Ga4Panel data={ga4} /> : <PanelSkeleton label="Loading GA4…" />}
          {ga4 ? (
            <FunnelPanel funnel={ga4.funnel} />
          ) : (
            <PanelSkeleton label="Loading funnel…" />
          )}
        </section>

        <section style={{ marginBottom: 24 }}>
          {hubspot ? (
            <HubspotPanel data={hubspot} />
          ) : (
            <PanelSkeleton label="Loading HubSpot…" />
          )}
        </section>

        <footer
          style={{
            color: "var(--payra-muted)",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          Built with Clay UI · Numbers are illustrative until GA4 and HubSpot
          credentials are wired.
        </footer>
      </main>
    </ClayIconSpriteContext.Provider>
  );
}

function PanelSkeleton({ label }: { label: string }) {
  return (
    <div
      className="panel"
      style={{
        minHeight: 240,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--payra-muted)",
      }}
    >
      {label}
    </div>
  );
}

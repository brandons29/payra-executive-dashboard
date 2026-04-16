# Payra · Executive KPI Dashboard

A Clay UI–based C-suite dashboard that unifies Payra's three primary signal
sources into one view:

| Source        | What it powers                                    |
| ------------- | ------------------------------------------------- |
| Payra core    | TPV, net revenue, auth rate, NRR, fraud, corridors |
| Google Analytics 4 | Top-of-funnel sessions, channel mix, signup funnel |
| HubSpot CRM   | Pipeline value, stage distribution, top deals     |

## Stack

- Vite + React + TypeScript
- [Clay UI](https://clayui.com/) (`@clayui/*`) for layout, icons, badges, tables
- Recharts for the area / bar / pie visualisations

## Run locally

```bash
npm install
npm run dev
```

The app boots at http://localhost:5173.

## Wiring real data

The connectors are deliberately isolated so live credentials drop in without
touching the UI:

- `src/sources/ga4.ts` → swap `mockGa4` for a call to the GA4 Data API
  (`POST .../properties/{PROPERTY_ID}:runReport`).
- `src/sources/hubspot.ts` → swap `mockHubspot` for HubSpot CRM v3 calls
  (`/crm/v3/objects/deals`, `/crm/v3/pipelines/deals`).

Both functions return typed snapshots, so the UI does not need to change.

## Layout

1. **Header KPIs (8 cards)** — the metrics the CEO/CFO/COO open the dashboard
   for: TPV, Net Revenue, Active Merchants, Auth Rate, ARPU, NRR, Fraud,
   CAC Payback.
2. **TPV & Revenue trend** + **Product mix** — 12-month performance and where
   revenue is coming from.
3. **Top corridors** + **Risk & compliance** — operational lens.
4. **GA4 panel** + **Activation funnel** — marketing → product conversion.
5. **HubSpot pipeline** — sales-driven growth signal with top open deals.

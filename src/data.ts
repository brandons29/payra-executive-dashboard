export type TrendPoint = {
  month: string;
  tpv: number;
  revenue: number;
  activeMerchants: number;
};

export type Kpi = {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  delta: number;
  deltaLabel: string;
  helper: string;
  positiveIsGood?: boolean;
};

export type CorridorRow = {
  corridor: string;
  volume: number;
  share: number;
  growth: number;
};

export type ProductMix = {
  name: string;
  value: number;
  color: string;
};

export type RiskAlert = {
  id: string;
  title: string;
  severity: "ok" | "warn" | "bad";
  detail: string;
};

export const trend: TrendPoint[] = [
  { month: "May", tpv: 412, revenue: 8.1, activeMerchants: 11200 },
  { month: "Jun", tpv: 438, revenue: 8.6, activeMerchants: 11680 },
  { month: "Jul", tpv: 461, revenue: 9.0, activeMerchants: 12010 },
  { month: "Aug", tpv: 489, revenue: 9.6, activeMerchants: 12440 },
  { month: "Sep", tpv: 510, revenue: 10.1, activeMerchants: 12890 },
  { month: "Oct", tpv: 547, revenue: 10.8, activeMerchants: 13310 },
  { month: "Nov", tpv: 572, revenue: 11.3, activeMerchants: 13720 },
  { month: "Dec", tpv: 614, revenue: 12.2, activeMerchants: 14180 },
  { month: "Jan", tpv: 595, revenue: 11.8, activeMerchants: 14460 },
  { month: "Feb", tpv: 631, revenue: 12.5, activeMerchants: 14790 },
  { month: "Mar", tpv: 672, revenue: 13.4, activeMerchants: 15240 },
  { month: "Apr", tpv: 708, revenue: 14.1, activeMerchants: 15710 },
];

export const kpis: Kpi[] = [
  {
    id: "tpv",
    label: "Total Payment Volume",
    value: "$708M",
    rawValue: 708_000_000,
    delta: 5.4,
    deltaLabel: "vs. last month",
    helper: "Trailing 30 days, all corridors",
    positiveIsGood: true,
  },
  {
    id: "revenue",
    label: "Net Revenue",
    value: "$14.1M",
    rawValue: 14_100_000,
    delta: 5.2,
    deltaLabel: "vs. last month",
    helper: "Take rate 1.99%",
    positiveIsGood: true,
  },
  {
    id: "merchants",
    label: "Active Merchants",
    value: "15,710",
    rawValue: 15710,
    delta: 3.1,
    deltaLabel: "MoM growth",
    helper: "Settled ≥ 1 txn this month",
    positiveIsGood: true,
  },
  {
    id: "auth",
    label: "Authorization Rate",
    value: "94.7%",
    rawValue: 94.7,
    delta: 0.4,
    deltaLabel: "vs. last month",
    helper: "Card-present + card-not-present",
    positiveIsGood: true,
  },
  {
    id: "arpu",
    label: "ARPU",
    value: "$897",
    rawValue: 897,
    delta: 2.0,
    deltaLabel: "vs. last month",
    helper: "Avg revenue per active merchant",
    positiveIsGood: true,
  },
  {
    id: "nrr",
    label: "Net Revenue Retention",
    value: "118%",
    rawValue: 118,
    delta: 1.6,
    deltaLabel: "vs. last quarter",
    helper: "Trailing 12 months",
    positiveIsGood: true,
  },
  {
    id: "fraud",
    label: "Fraud / Chargeback",
    value: "0.18%",
    rawValue: 0.18,
    delta: -0.03,
    deltaLabel: "vs. last month",
    helper: "Of total volume",
    positiveIsGood: false,
  },
  {
    id: "cac",
    label: "CAC Payback",
    value: "8.4 mo",
    rawValue: 8.4,
    delta: -0.6,
    deltaLabel: "vs. last quarter",
    helper: "Blended across SMB + Enterprise",
    positiveIsGood: false,
  },
];

export const corridors: CorridorRow[] = [
  { corridor: "US ↔ MX", volume: 184, share: 26, growth: 7.2 },
  { corridor: "US ↔ BR", volume: 132, share: 19, growth: 9.4 },
  { corridor: "EU ↔ NG", volume: 98, share: 14, growth: 11.8 },
  { corridor: "US ↔ PH", volume: 81, share: 11, growth: 4.6 },
  { corridor: "EU ↔ IN", volume: 74, share: 10, growth: 6.1 },
  { corridor: "Other", volume: 139, share: 20, growth: 3.2 },
];

export const productMix: ProductMix[] = [
  { name: "Card Acquiring", value: 46, color: "#4361ee" },
  { name: "Cross-border", value: 28, color: "#7048e8" },
  { name: "Payouts", value: 16, color: "#22b8cf" },
  { name: "Embedded Finance", value: 10, color: "#f59f00" },
];

export const riskAlerts: RiskAlert[] = [
  {
    id: "r1",
    title: "PSP redundancy healthy",
    severity: "ok",
    detail: "All 4 acquirers within SLA, failover tested 3 days ago.",
  },
  {
    id: "r2",
    title: "BR corridor settlement delay",
    severity: "warn",
    detail: "Avg T+1.4 vs. target T+1; partner BCB queue spike.",
  },
  {
    id: "r3",
    title: "Chargeback ratio (NG)",
    severity: "warn",
    detail: "0.41% in last 7d, approaching 0.5% Visa threshold.",
  },
  {
    id: "r4",
    title: "SOC 2 Type II audit",
    severity: "ok",
    detail: "On track for issuance May 22.",
  },
];

/**
 * HubSpot connector for Payra's CRM.
 * Replace `mockHubspot` with calls to:
 *   - GET https://api.hubapi.com/crm/v3/objects/deals (pipeline + stages)
 *   - GET https://api.hubapi.com/marketing/v3/forms (MQL signal)
 *   - GET https://api.hubapi.com/crm/v3/pipelines/deals (stage metadata)
 * once the HubSpot private-app token is provisioned.
 */

export type HubspotSnapshot = {
  pipelineValue: number;
  pipelineDeltaPct: number;
  weightedPipeline: number;
  newMqls: number;
  mqlToSqlRate: number;
  sqlToWinRate: number;
  avgSalesCycleDays: number;
  demosBookedThisMonth: number;
  stages: { stage: string; deals: number; value: number; color: string }[];
  topDeals: {
    name: string;
    stage: string;
    value: number;
    owner: string;
    closeDate: string;
  }[];
};

const mockHubspot: HubspotSnapshot = {
  pipelineValue: 48_700_000,
  pipelineDeltaPct: 12.3,
  weightedPipeline: 19_840_000,
  newMqls: 2_184,
  mqlToSqlRate: 22.4,
  sqlToWinRate: 28.6,
  avgSalesCycleDays: 47,
  demosBookedThisMonth: 312,
  stages: [
    { stage: "Discovery", deals: 184, value: 12_400_000, color: "#a5b4fc" },
    { stage: "Qualified", deals: 121, value: 14_900_000, color: "#7c8cfb" },
    { stage: "Proposal", deals: 64, value: 11_200_000, color: "#4361ee" },
    { stage: "Negotiation", deals: 28, value: 7_800_000, color: "#3730a3" },
    { stage: "Contract Out", deals: 11, value: 2_400_000, color: "#1e1b4b" },
  ],
  topDeals: [
    {
      name: "Atlas Logistics — Card + Payouts",
      stage: "Negotiation",
      value: 1_240_000,
      owner: "M. Alvarez",
      closeDate: "2026-04-29",
    },
    {
      name: "Northwind Marketplace",
      stage: "Proposal",
      value: 980_000,
      owner: "S. Chen",
      closeDate: "2026-05-12",
    },
    {
      name: "Helios Travel Group",
      stage: "Qualified",
      value: 760_000,
      owner: "R. Okafor",
      closeDate: "2026-05-30",
    },
    {
      name: "Verta Health Networks",
      stage: "Negotiation",
      value: 690_000,
      owner: "M. Alvarez",
      closeDate: "2026-04-22",
    },
    {
      name: "Sundara Remit",
      stage: "Proposal",
      value: 540_000,
      owner: "P. Singh",
      closeDate: "2026-05-08",
    },
  ],
};

export async function fetchHubspotSnapshot(): Promise<HubspotSnapshot> {
  return Promise.resolve(mockHubspot);
}

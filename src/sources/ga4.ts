/**
 * GA4 connector for payra.com.
 * Replace `mockGa4` with a fetch to the GA4 Data API
 * (POST https://analyticsdata.googleapis.com/v1beta/properties/{PROPERTY_ID}:runReport)
 * once the service-account credentials are wired in.
 */

export type Ga4Snapshot = {
  sessions: number;
  sessionsDeltaPct: number;
  engagedSessionRate: number;
  signupConversionRate: number;
  avgSessionDurationSec: number;
  topChannels: { channel: string; sessions: number; share: number }[];
  funnel: { step: string; users: number }[];
  weeklySessions: { week: string; sessions: number }[];
};

const mockGa4: Ga4Snapshot = {
  sessions: 412_840,
  sessionsDeltaPct: 6.8,
  engagedSessionRate: 62.4,
  signupConversionRate: 3.9,
  avgSessionDurationSec: 184,
  topChannels: [
    { channel: "Organic Search", sessions: 158_400, share: 38 },
    { channel: "Direct", sessions: 95_960, share: 23 },
    { channel: "Paid Search", sessions: 70_180, share: 17 },
    { channel: "Referral", sessions: 49_540, share: 12 },
    { channel: "Email", sessions: 24_770, share: 6 },
    { channel: "Social", sessions: 13_990, share: 4 },
  ],
  funnel: [
    { step: "Site visits", users: 412_840 },
    { step: "Pricing viewed", users: 138_120 },
    { step: "Started signup", users: 41_290 },
    { step: "Completed KYC", users: 16_104 },
    { step: "First settled txn", users: 9_872 },
  ],
  weeklySessions: [
    { week: "W-11", sessions: 78_120 },
    { week: "W-10", sessions: 81_240 },
    { week: "W-9", sessions: 83_710 },
    { week: "W-8", sessions: 86_900 },
    { week: "W-7", sessions: 89_330 },
    { week: "W-6", sessions: 91_640 },
    { week: "W-5", sessions: 94_120 },
    { week: "W-4", sessions: 96_480 },
    { week: "W-3", sessions: 99_220 },
    { week: "W-2", sessions: 101_510 },
    { week: "W-1", sessions: 104_820 },
    { week: "This wk", sessions: 107_960 },
  ],
};

export async function fetchGa4Snapshot(): Promise<Ga4Snapshot> {
  return Promise.resolve(mockGa4);
}

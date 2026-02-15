export const DateFormat = {
  ISO: 'YYYY-MM-DD',
  US: 'MM/DD/YYYY',
  EUR_LATAM: 'DD/MM/YYYY',
  EAST_ASIA: 'YYYY/MM/DD',
  US_LONG: 'MMMM DD, YYYY',
  INT_LONG: 'DD MMMM YYYY',
  US_ABBR: 'MMM DD, YYYY',
  INT_ABBR: 'DD MMM YYYY',
  MONT_YEAR: 'MMMM YYYY',
  MONT_YEAR_ABBR: 'MMM YYYY',
  YEAR_ONLY: 'YYYY',
} as const;

export type DateFormat = (typeof DateFormat)[keyof typeof DateFormat];

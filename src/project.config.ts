import { DateFormat } from '@/core/constants/dates';

export default {
  name: 'Social Events Planner',
  version: 'v1.0.0',
  brand: {
    name: 'Sevilla Social Hall',
    logoSrc: '/logo.svg',
  },
  time: {
    timeZone: 'America/Tijuana',
    dateTimeFormat: `${DateFormat.EUR_LATAM} hh:mm A`,
    dateFormat: DateFormat.EUR_LATAM,
  },
  baseApi: {
    url: import.meta.env?.VITE_BASE_API_URL,
  },
} as const;

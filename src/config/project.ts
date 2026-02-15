import { DateFormat } from '@/core/constants/dates';

const projectConfig = {
  name: 'Social Events App',
  brand: 'Social Events Hall',
  time: {
    timeZone: 'America/Tijuana',
    dateTimeFormat: `${DateFormat.EUR_LATAM} hh:mm A`,
    dateFormat: DateFormat.EUR_LATAM,
  },
  baseApi: {
    url: import.meta.env?.VITE_BASE_API_URL,
  },
} as const;

export default projectConfig;

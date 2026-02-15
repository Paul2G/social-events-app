import type { CommonDataRecord } from '@/core/types/fetch';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

import projectConfig from '@/config/project';

dayjs.extend(timezone);

/**  Converts a dictionary to URLSearchParams object. */
export function getSearchParamsFromObject(object: CommonDataRecord) {
  const searchParams = new URLSearchParams();

  Object.entries(object).forEach(([key, value]) => {
    if (value instanceof Array && value?.length) {
      searchParams.append(key, JSON.stringify(value));
    } else if (typeof value === 'string' || typeof value === 'number') {
      searchParams.append(key, value.toString());
    } else if (value instanceof Date) {
      searchParams.append(
        key,
        dayjs(value)
          .tz(projectConfig.time.timeZone)
          .format(projectConfig.time.dateTimeFormat),
      );
    }
  });

  return searchParams;
}

/** Exclusive usage to covert object to search params for SolSys queries, this way of create search params looks awful */
export function getSearchParamsFromObjectForBaseApi(object: CommonDataRecord) {
  const searchParams = new URLSearchParams();

  Object.entries(object).forEach(([key, value]) => {
    if (value instanceof Array && value?.length) {
      value.forEach((valueItem) => {
        if (typeof valueItem !== 'object') {
          searchParams.append(`${key}[]`, valueItem.toString());
        }
      });
    } else if (value && typeof value !== 'object') {
      searchParams.append(key, value.toString());
    } else if (value instanceof Date) {
      searchParams.append(
        key,
        dayjs(value)
          .tz(projectConfig.time.timeZone)
          .format(projectConfig.time.dateTimeFormat),
      );
    }
  });

  return searchParams;
}

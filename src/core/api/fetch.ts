import {
  FetchMethod,
  FetchRequestContentType,
  FetchResponseType,
  ServiceApi,
} from '@/core/constants/fetch';
import { NotOkResponseError } from '@/core/errors';
import { getSearchParamsFromObjectForBaseApi } from '@/core/lib/search-params';
import { type CommonDataRecord } from '@/core/types/fetch';
import { getUserToken } from '@/modules/auth/lib/token';
import projectConfig from '@/project.config';

/** Makes a request to the base API endpoint with specified parameters. */
export async function fetchToApi<T = unknown>(
  config: FetchBaseApiOptions,
): Promise<T> {
  const {
    path,
    body,
    params = {},
    headers: customHeaders,
    method = FetchMethod.GET,
    responseType = FetchResponseType.JSON,
    contentType = FetchRequestContentType.JSON,
    serviceApi = ServiceApi.BASE_V1,
    timeout,
  } = config;

  // `getUserFunction` is client side only
  let userToken;
  if (typeof window !== 'undefined') {
    userToken = getUserToken();
  }

  const headers = new Headers(customHeaders);
  if (userToken) {
    headers.set('Authorization', `Bearer ${userToken}`);
  }
  if (contentType !== FetchRequestContentType.FORM_DATA) {
    headers.set('Content-Type', contentType);
  }
  const options = {
    body,
    method,
    headers,
    timeout,
  };

  const searchParams = getSearchParamsFromObjectForBaseApi(params);
  const url = `${projectConfig.baseApi.url}${serviceApi}${path}?${searchParams.toString()}`;

  const response = await fetch(url, options);

  let parsedResponse;

  try {
    switch (responseType) {
      case FetchResponseType.JSON:
        parsedResponse = await response.json();
        break;
      case FetchResponseType.BLOB:
        parsedResponse = await response.blob();
        break;
      case FetchResponseType.TEXT:
        parsedResponse = await response.text();
        break;
    }
  } catch (error) {
    if (error instanceof Error)
      parsedResponse = {
        title: 'Failed to parse response',
        detail: error.message,
      };
  }

  if (!response?.ok) {
    throw new NotOkResponseError({
      type: parsedResponse?.type,
      title: parsedResponse?.title ?? response?.statusText,
      detail: parsedResponse.detail,
      instance: parsedResponse?.instance,
      status: response?.status,
    });
  }

  return parsedResponse;
}

type FetchBaseApiOptions = {
  /** The path to the API endpoint. */
  path: string;
  /** The request body data. */
  body?: BodyInit;
  /** Additional parameters for the request. */
  params?: CommonDataRecord;
  /** Custom request headers */
  headers?: HeadersInit;
  /** The HTTP method for the request. */
  method?: FetchMethod;
  /** The content type for the request headers. */
  contentType?: FetchRequestContentType;
  /** The response type expected from the request. */
  responseType?: FetchResponseType;
  /** The version of the API to use. */
  serviceApi?: ServiceApi;
  /** The timeout duration for the request. */
  timeout?: number;
};

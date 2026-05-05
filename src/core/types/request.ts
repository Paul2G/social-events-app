export type RequestData =
  | string
  | number
  | boolean
  | Date // URLSearchParams and fetch Body support date parsing from Date object
  | null
  | { [x: string]: RequestData }
  | Array<RequestData>;

export type RequestDataRecord = Record<string, RequestData>;

export interface RequestOptions {
  query?: RequestDataRecord;
  body?: RequestDataRecord;
  signal?: AbortSignal;
}

/**
 * Specifies the type for the fetch request options for getItem and getAllItems requests.
 */
export type GetOptions = Omit<RequestOptions, 'body'>;
export type MutationOptions = RequestOptions;

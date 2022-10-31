/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * DPL CMS - REST API
 * The REST API provide by the core REST module.
 * OpenAPI spec version: Versioning not supported
 */
import {
  useQuery,
  UseQueryOptions,
  QueryFunction,
  UseQueryResult,
  QueryKey
} from "react-query";
import type { ProxyUrlGET200, ProxyUrlGETParams } from "./model";
import { fetcher, ErrorType, BodyType } from "./mutator/fetcher";

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

/**
 * @summary Generate proxy url
 */
export const proxyUrlGET = (
  params?: ProxyUrlGETParams,
  signal?: AbortSignal
) => {
  return fetcher<ProxyUrlGET200>({
    url: `/dpl-url-proxy`,
    method: "get",
    signal,
    params
  });
};

export const getProxyUrlGETQueryKey = (params?: ProxyUrlGETParams) => [
  `/dpl-url-proxy`,
  ...(params ? [params] : [])
];

export type ProxyUrlGETQueryResult = NonNullable<
  Awaited<ReturnType<typeof proxyUrlGET>>
>;
export type ProxyUrlGETQueryError = ErrorType<void>;

export const useProxyUrlGET = <
  TData = Awaited<ReturnType<typeof proxyUrlGET>>,
  TError = ErrorType<void>
>(
  params?: ProxyUrlGETParams,
  queryOptions?: UseQueryOptions<
    Awaited<ReturnType<typeof proxyUrlGET>>,
    TError,
    TData
  >
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryKey = queryOptions?.queryKey ?? getProxyUrlGETQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof proxyUrlGET>>> = ({
    signal
  }) => proxyUrlGET(params);

  const query = useQuery<
    Awaited<ReturnType<typeof proxyUrlGET>>,
    TError,
    TData
  >(queryKey, queryFn, queryOptions);

  return {
    queryKey,
    ...query
  };
};
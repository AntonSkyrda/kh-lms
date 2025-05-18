import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../lib/consts";
import type { BaseResponseWithList } from "../schemas/backendResponseSchema";

interface IuseResources<T> {
  resourceName: string;
  fetchFn: () => Promise<BaseResponseWithList<T>>;
  enableCondition?: boolean | string | null;
  queryParams?: Record<string, string | number | boolean>;
}

export function useResources<T>({
  resourceName,
  fetchFn,
  enableCondition,
  queryParams = {},
}: IuseResources<T>) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page")
    ? 0
    : Number(searchParams.get("page")) - 1;

  const {
    isLoading,
    data: { count: totalItems, next, previous, results } = {
      count: 0,
      next: 0,
      previous: 0,
      results: [],
    },
    error,
  } = useQuery({
    queryKey: [resourceName, page, ...Object.values(queryParams)],
    queryFn: () => fetchFn(),
    enabled:
      typeof enableCondition === "string"
        ? searchParams.get("type") === enableCondition
        : enableCondition !== false,
    retry: false,
  });

  const pageCount = Math.ceil(totalItems! / ITEMS_PER_PAGE) - 1;
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [resourceName, page + 1, ...Object.values(queryParams)],
      queryFn: () => fetchFn(),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [resourceName, page - 1, ...Object.values(queryParams)],
      queryFn: () => fetchFn(),
    });

  return { isLoading, totalItems, next, previous, results, error };
}

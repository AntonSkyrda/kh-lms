import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../lib/consts";
import type { BaseResponseWithList } from "../schemas/backendResponseSchema";

interface IuseResources<T> {
  resourceName: string;
  fetchFn: ({
    page,
    search,
  }: {
    page?: number;
    search?: string;
  }) => Promise<BaseResponseWithList<T>>;
  enableCondition?: boolean | string | null;
  queryParams?: Record<string, string | number | boolean>;
  searchStr?: string;
}

export function useResources<T>({
  resourceName,
  fetchFn,
  enableCondition,
  queryParams = {},
  searchStr,
}: IuseResources<T>) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  function getPage() {
    const pageParam = searchParams.get("page");
    if (!pageParam) return 0;
    if (Number(pageParam) <= 0) return 0;

    return Number(pageParam) - 1;
  }

  const page = getPage();

  console.log(page);

  const search = !searchParams.get("search")
    ? searchStr
      ? searchStr
      : ""
    : String(searchParams.get("search"));

  const {
    isLoading,
    data: { count: totalItems, next, previous, results } = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    error,
  } = useQuery({
    queryKey: [resourceName, page, ...Object.values(queryParams)],
    queryFn: () => fetchFn({ page, search }),
    enabled:
      typeof enableCondition === "string"
        ? searchParams.get("type") === enableCondition
        : enableCondition !== false,
    retry: false,
  });

  const pageCount = Math.ceil(totalItems! / ITEMS_PER_PAGE);
  console.log(pageCount);
  if (page < pageCount && page)
    queryClient.prefetchQuery({
      queryKey: [resourceName, page + 1, ...Object.values(queryParams)],
      queryFn: () => fetchFn({ page, search }),
    });

  // if (page > 0)
  //   queryClient.prefetchQuery({
  //     queryKey: [resourceName, page - 1, ...Object.values(queryParams)],
  //     queryFn: () => fetchFn({ page, search }),
  //   });

  return { isLoading, totalItems, next, previous, results, error };
}

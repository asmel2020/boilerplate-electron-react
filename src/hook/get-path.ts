import { useQuery } from "@tanstack/react-query";

export function useGetPath() {
  const getPathQuery = useQuery({
    queryKey: ["getPath"],
    queryFn: () => window.api.common.getPath(),
  });
  return { getPathQuery };
}

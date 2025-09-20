import { useQuery } from "@tanstack/react-query";

export function useFindAllBook() {
  const findAllBookQuery = useQuery({
    queryKey: ["book"],
    queryFn: () => window.api.findAllBooks(),
  });
  return { findAllBookQuery };
}

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useReadCapBook() {
  const [capId, setCapId] = useState<string | undefined>(undefined);
  const readBookQuery = useQuery({
    queryKey: ["ReadCapBook", capId],
    queryFn: () => window.api.book.readBook(capId || ""),
    enabled: !!capId,
  });
  return {
    readBookQuery: {
      ...readBookQuery,
      capId,
      setCapId,
    },
  };
}

"use client";

import { useState, useEffect } from "react";
import { graphClient } from "../helpers/graphClient";

// Types
// hook parameters
//example
type UseGraphQueryResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useGraphQuery<T>(query: string, variables?: Record<string, any>): UseGraphQueryResult<T> {
  // fetched data
  const [data, setData] = useState<T | null>(null);
  // loading
  const [loading, setLoading] = useState<boolean>(true);
  // error handling
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await graphClient.request<T>(query, variables);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // depends on your data in your route
  }, [query, JSON.stringify(variables)]);

  return { data, loading, error };
}

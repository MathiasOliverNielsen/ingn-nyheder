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

  const queryCache = new Map<string, { data: any; timestamp: number }>();
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    const fetchData = async () => {
      // Before fetching, check cache:
      const cacheKey = `${query}:${JSON.stringify(variables || {})}`;
      const cached = queryCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setData(cached.data);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await graphClient.request<T>(query, variables);
        setData(result);
        setError(null);

        // Store in cache
        queryCache.set(cacheKey, { data: result, timestamp: Date.now() });
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

import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export function useLocationSearch() {
  const location = useLocation();
  const searchParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const query = Array.from(params.entries()).reduce((current, [key, value]) => {
      current[key] = value;
      return current;
    }, {} as Record<string, string>);
    return query;
  }, [location.search])

  return searchParams;
}

import { useMemo } from "react";
import { httpClient } from "@/services/http/client";

function useAxios() {
  const API = useMemo(() => httpClient, []);

  return {
    API,
    loading: false,
  };
}

export default useAxios;

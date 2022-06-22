import { useEffect, useState } from "react";
import { ILoading } from "../types/ILoading";
import axios from "axios";

export function useLoading<T>(url: string): ILoading<T> {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    const getData = async () => {
      await axios
        .get(url, { signal: controller.signal })
        .then((movie) => {
          setData(movie.data.results);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        })
        .finally(() => {
          controller.abort();
          setLoading(false);
        });
    };
    getData();
  }, [url]);

  return { data, loading, error };
}

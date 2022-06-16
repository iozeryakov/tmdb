import { useEffect, useState } from "react";
import { ILoading } from "../types/ILoading";
import axios from "axios";

export function useLoading<T>(url: string): ILoading<T> {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((movie) => {
        setData(movie.data.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

interface FetchOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  bodyData?: any;
}

export const useFetch = ({ method, path, bodyData }: FetchOptions) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/${path}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: bodyData ? JSON.stringify(bodyData) : null,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [method, path, bodyData]);

  return { data, loading, error };
};

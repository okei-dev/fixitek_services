import { useState, useEffect } from "react";
import { getServicesByCategory } from "../serviceApi";
import { Service } from "@/types/service";

export const useService = (categoryId?: number) => {
  const [services, setService] = useState<Service[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null)
        const data = await getServicesByCategory(categoryId);
        setService(data);
      } catch (err) {
        console.error('Failed to fetch services', err);
        setError("Failed to fetch service details.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [categoryId]);

  return { services, loading, error };
};

import { useQuery } from "@tanstack/react-query";

import { getCars } from "@/services/cars.service";

export const useCars = () => {
  const carsQuery = useQuery({
    queryKey: ["cars"],
    queryFn: () => getCars(),
    staleTime: 60 * 60 * 1000,
  });

  return {
    data: carsQuery.data,
    isLoading: carsQuery.isLoading,
  };
};

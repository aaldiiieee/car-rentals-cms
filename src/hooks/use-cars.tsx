import { useQuery, useMutation } from "@tanstack/react-query";

import { getCars, addCar } from "@/services/cars.service";

export const useCars = () => {
  const carsQuery = useQuery({
    queryKey: ["cars"],
    queryFn: () => getCars(),
    staleTime: 60 * 60 * 1000,
  });

  const addCarMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await addCar(data);
      return response.data;
    },
    onSuccess: () => {
      carsQuery.refetch();
    },
  });

  return {
    data: carsQuery.data,
    isLoading: carsQuery.isLoading,
    addCarMutation,
  };
};

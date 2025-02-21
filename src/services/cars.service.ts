import callApiUrl from "@/lib/api";

export const getCars = async () => {
  const response = await callApiUrl("/cars/get-all-cars");
  return response.data;
};

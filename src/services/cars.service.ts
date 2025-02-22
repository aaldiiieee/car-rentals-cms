import callApiUrl from "@/lib/api";

export const getCars = async () => {
  const response = await callApiUrl("/cars/get-all-cars");
  return response.data;
};

export const addCar = async (data: FormData) => {
  const response = await callApiUrl("/cars/create-car", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
  return response.data;
};

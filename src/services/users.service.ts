import callApiUrl from "@/lib/api";

export const getUsers = async () => {
  const response = await callApiUrl("/users/backoffice/get-all-users");
  return response.data;
};

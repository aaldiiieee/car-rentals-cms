import callApiUrl from "@/lib/api";

export const getAllTestimonials = async () => {
  const response = await callApiUrl.get("/testimonials/get-all-testimonials");
  return response.data;
};

export const updateShowComment = async (id: string) => {
  const response = await callApiUrl.post(`/testimonials/show-hide-testimonial/${id}`);
  return response.data;
};

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import { getAllTestimonials, updateShowComment } from "@/services/testimonials.service";

import { columns as baseColumns, ITestimonials } from "./columns";

export default function Page() {
  const queryClient = useQueryClient();

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => getAllTestimonials(),
    staleTime: 60 * 60 * 1000,
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await updateShowComment(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });

  const columns = baseColumns.map((column: ColumnDef<ITestimonials>) => {
    if ((column as { accessorKey: string }).accessorKey === "mt_show_comment") {
      return {
        ...column,
        cell: ({ row }: any) => {
          const handleToggle = () => {
            const id = row.original.mt_id;
            mutation.mutate(id);
          };

          return (
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={row.original?.mt_show_comment}
                onChange={handleToggle}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            </label>
          );
        },
      };
    }
    return column;
  });

  return <DataTable columns={columns} data={testimonials?.data || []} isLoading={isLoading} />;
}

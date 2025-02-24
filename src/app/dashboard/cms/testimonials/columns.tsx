"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ITestimonials = {
  mt_id: number;
  mt_user_uuid: string;
  mt_rating: string;
  mt_comment: string;
  mt_show_comment: boolean;
  user: {
    mu_full_name: string;
    mu_email: string;
  };
};

export const columns: ColumnDef<ITestimonials>[] = [
  {
    accessorKey: "mt_id",
    header: "ID",
  },
  {
    header: "Nama Pengguna",
    cell: ({ row }) => (
      <div>
        <p>{row.original?.user?.mu_full_name}</p>
      </div>
    ),
  },
  {
    header: "Email Pengguna",
    cell: ({ row }) => (
      <div>
        <p>{row.original?.user?.mu_email}</p>
      </div>
    ),
  },
  {
    accessorKey: "mt_rating",
    header: "Rating",
  },
  {
    accessorKey: "mt_comment",
    header: "Komentar",
  },
  {
    accessorKey: "mt_show_comment",
    header: "Tampilkan Komentar",
  },
];

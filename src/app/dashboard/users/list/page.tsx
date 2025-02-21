"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/data-table";
import { getUsers } from "@/services/users.service";

import { columns } from "./columns";

export default function Page() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    staleTime: 60 * 60 * 1000,
    retry: false,
  });
  return <DataTable columns={columns} data={users?.data || []} isLoading={isLoading} />;
}

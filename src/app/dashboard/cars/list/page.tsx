"use client";

import React from "react";

import { DataTable } from "@/components/data-table";
import { useCars } from "@/hooks/use-cars";

import { columns } from "./columns";

export default function Page() {
  const { data: cars, isLoading } = useCars();

  return <DataTable columns={columns} data={cars?.data || []} isLoading={isLoading} />;
}

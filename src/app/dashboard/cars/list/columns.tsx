"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ICars = {
  mcp_uuid: string;
  mcp_plate: string;
  mcp_manufacture: string;
  mcp_model: string;
  mcp_rent_type: string;
  mcp_rent_per_day: number;
  mcp_capacity: number;
  mcp_transmission: string;
  mcp_available: string;
  mcp_year: number;
  mcp_createdAt: string;
  mcp_updatedAt: string;
};

export const columns: ColumnDef<ICars>[] = [
  {
    accessorKey: "mcp_plate",
    header: "Plate",
  },
  {
    accessorKey: "mcp_manufacture",
    header: "Manufaktur",
  },
  {
    accessorKey: "mcp_model",
    header: "Model",
  },
  {
    accessorKey: "mcp_rent_type",
    header: "Tipe Sewa",
  },
  {
    accessorKey: "mcp_rent_per_day",
    header: "Harga Sewa/Hari",
    cell: ({ row }) => {
      const cars = row.original;
      return cars.mcp_rent_per_day.toLocaleString("id-ID");
    },
  },
  {
    accessorKey: "mcp_capacity",
    header: "Kapasitas",
  },
  {
    accessorKey: "mcp_transmission",
    header: "Transmisi",
  },
  {
    accessorKey: "mcp_available",
    header: "Status Tersedia",
  },
  {
    accessorKey: "mcp_year",
    header: "Tahun",
  },
  {
    accessorKey: "mcp_createdAt",
    header: "Tanggal Pendaftaran",
    cell: ({ row }) => {
      const cars = row.original;
      return new Date(cars.mcp_createdAt).toLocaleDateString("id-ID");
    },
  },
  {
    accessorKey: "mcp_updatedAt",
    header: "Tanggal Update",
    cell: ({ row }) => {
      const cars = row.original;
      return new Date(cars.mcp_updatedAt).toLocaleDateString("id-ID");
    },
  },
  {
    accessorKey: "mcp_uuid",
    header: "Action",
    cell: ({ row }) => {
      const cars = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(cars.mcp_plate)}>
              Salin Plat Nomor
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

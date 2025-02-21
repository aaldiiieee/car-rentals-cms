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

export type IUsers = {
  mub_id: number;
  mub_uuid: string;
  mub_phone_number: string;
  mub_email: string;
  mub_password: string;
  mub_full_name: string;
  mub_image_url: string;
  mub_image_public_id: string;
  mub_role: string;
  mub_createdAt: string;
  mub_updatedAt: string;
};

export const columns: ColumnDef<IUsers>[] = [
  {
    accessorKey: "mub_id",
    header: "ID",
  },
  {
    accessorKey: "mub_full_name",
    header: "Nama Lengkap",
  },
  {
    accessorKey: "mub_email",
    header: "Email",
  },
  {
    accessorKey: "mub_phone_number",
    header: "Nomor Telepon",
  },
  {
    accessorKey: "mub_role",
    header: "Role",
  },
  {
    accessorKey: "mub_createdAt",
    header: "Tanggal Pendaftaran",
    cell: ({ row }) => {
      const users = row.original;
      return new Date(users.mub_createdAt).toLocaleDateString("id-ID");
    },
  },
  {
    accessorKey: "mcp_updatedAt",
    header: "Tanggal Update",
    cell: ({ row }) => {
      const users = row.original;
      return new Date(users.mub_updatedAt).toLocaleDateString("id-ID");
    },
  },
  {
    accessorKey: "mcp_uuid",
    header: "Action",
    cell: ({ row }) => {
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
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

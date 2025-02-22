"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCars } from "@/hooks/use-cars";

const FormSchema = z.object({
  mcp_plate: z.string().nullable(),
  mcp_manufacture: z.string().nullable(),
  mcp_model: z.string().nullable(),
  uploads: z.any(),
  mcp_rent_type: z.string().nullable(),
  mcp_rent_per_day: z.string().nullable(),
  mcp_capacity: z.string().nullable(),
  mcp_description: z.string().nullable(),
  mcp_transmission: z.string().nullable(),
  mcp_available: z.string().nullable(),
  mcp_year: z.string().nullable(),
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mcp_plate: "",
      mcp_manufacture: "",
      mcp_model: "",
      uploads: null,
      mcp_rent_type: "",
      mcp_rent_per_day: "",
      mcp_capacity: "",
      mcp_description: "",
      mcp_transmission: "",
      mcp_available: "",
      mcp_year: "",
    },
  });

  const { addCarMutation } = useCars();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "uploads" && value instanceof File) {
        formData.append(key, value);
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    addCarMutation.mutate(formData, {
      onSuccess: () => {
        alert("Car added successfully!");
        form.reset();
      },
      onError: (error) => {
        console.error(error);
        alert("Failed to add car. Please try again.");
      },
    });

    console.log(formData);
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Add Car</CardTitle>
              <CardDescription>Add a new car</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="mcp_model"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Camry" type="text" {...field} value={field.value as string} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mcp_plate"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Plat Nomor</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. B 1234 AB"
                        {...field}
                        value={field.value as string}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mcp_manufacture"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Manufaktur</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Toyota" {...field} value={field.value as string} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mcp_rent_per_day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rental Per Hari</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g. 100.000" {...field} value={field.value as string} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mcp_capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kapasitas</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g. 4" {...field} value={field.value as string} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mcp_transmission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transmisi</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value as string}
                      {...field}
                      value={field.value as string}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Transmisi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MANUAL">Manual</SelectItem>
                        <SelectItem value="MATIC">Matic</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mcp_rent_type"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Tipe Sewa</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipe Sewa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="WITH_DRIVER">Dengan Supir</SelectItem>
                        <SelectItem value="WITHOUT_DRIVER">Lepas Supir</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mcp_available"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Tersedia</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tersedia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USED">Sedang Dipakai</SelectItem>
                        <SelectItem value="NOT_USED">Tersedia</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mcp_year"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Tahun Mobil</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g. 2022" {...field} value={field.value as string} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="mcp_description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g. Toyota Camry adalah mobil terbaik"
                        className="h-32"
                        maxLength={200}
                        {...field}
                        value={field.value as string}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="pt-6">
              <Controller
                control={form.control}
                name="uploads"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto Mobil</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          field.onChange(e.target.files?.[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="mt-4">
              <Button type="submit" className="w-full h-12" disabled={addCarMutation.isPending}>
                {addCarMutation.isPending ? "Adding..." : "Add Car"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </section>
  );
}

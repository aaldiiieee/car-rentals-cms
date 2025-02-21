import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Car {
  mcp_id: number;
  mcp_uuid: string;
  mcp_plate: string;
  mcp_manufacture: string;
  mcp_model: string;
  mcp_image_url: string;
  mcp_image_public_id: string;
  mcp_rent_type: string;
  mcp_rent_per_day: number;
  mcp_capacity: number;
  mcp_description: string;
  mcp_transmission: string;
  mcp_available: string;
  mcp_year: number;
  mcp_createdAt: string;
  mcp_updatedAt: string;
}

interface CarStore {
  carsData: Car[];
  setCars: (cars: Car[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: Error | null;
  setError: (error: Error | null) => void;
}

export const useCarStore = create<CarStore>()(
  devtools((set) => ({
    carsData: [],
    setCars: (carsData) => set({ carsData }),
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    error: null,
    setError: (error) => set({ error }),
  })),
);

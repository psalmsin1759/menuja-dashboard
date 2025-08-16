import api from "@/lib/axios";
import { handleApiError } from "@/utils/handleApiError";

export interface MostSoldFood {
    count: number;
    food: string;
}

export async function getMostSoldFood(): Promise<MostSoldFood[]> {
  try {
    const res = await api.get("orders/analytics/most-sold-foods");
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}
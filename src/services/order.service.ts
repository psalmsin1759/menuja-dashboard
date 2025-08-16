import api from "@/lib/axios";
import { RevenueData } from "@/types/order";
import { handleApiError } from "@/utils/handleApiError";

interface CountResponse {
  count: number;
}

interface RevenueResponse {
  revenue: number;
}

export async function getOrderCount(): Promise<CountResponse> {
  try {
    const res = await api.get("orders/analytics/count");
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getRevenue(): Promise<RevenueResponse> {
  try {
    const res = await api.get("orders/analytics/revenue");
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getMonthlyRevenue(): Promise<RevenueData[]> {
  try {
    const res = await api.get("orders/analytics/monthly-revenue");
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}

"use client";

import { getMonthlyRevenue } from "@/services/order.service";
import { RevenueData } from "@/types/order";
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueGraph() {
  const [revenueGraphData, setRevenueGraphData] = useState<RevenueData[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getMonthlyRevenue();
      setRevenueGraphData(res);
    })();
  }, []);

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4 ">
      <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueGraphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `₦${value}`} />
            <Tooltip formatter={(value) => `${value}`} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

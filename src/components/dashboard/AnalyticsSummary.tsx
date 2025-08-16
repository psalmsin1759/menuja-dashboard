"use client";

import { analyticsSummary } from "@/constants/data";
import { MdAttachMoney, MdShoppingCart } from "react-icons/md";
import { getOrderCount, getRevenue } from "@/services/order.service";
import { useEffect, useState } from "react";

export default function AnalyticsSummary() {
  const [orderCount, setOrderCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const fetchData = async () => {
    const [resCount, resRevenue] = await Promise.all([
      getOrderCount(),
      getRevenue(),
    ]);
    setOrderCount(resCount.count);
    setRevenue(resRevenue.revenue);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="flex items-center h-[100px] gap-4 bg-white shadow-sm rounded-lg p-4 border border-gray-100">
        <div className={`text-3xl text-blue-500`}>
          <MdShoppingCart />
        </div>
        <div>
          <div className="text-lg font-semibold">Orders</div>
          <div className="text-sm text-gray-500">{orderCount}</div>
        </div>
      </div>

      <div className="flex items-center h-[100px] gap-4 bg-white shadow-sm rounded-lg p-4 border border-gray-100">
        <div className={`text-3xl text-blue-500`}>
          <MdAttachMoney />
        </div>
        <div>
          <div className="text-lg font-semibold">Revenue</div>
          <div className="text-sm text-gray-500">₦{revenue}</div>
        </div>
      </div>

      {analyticsSummary.map((item) => (
        <div
          key={item.title}
          className="flex items-center h-[100px] gap-4 bg-white shadow-sm rounded-lg p-4 border border-gray-100"
        >
          <div className={`text-3xl ${item.color}`}>
            <item.icon />
          </div>
          <div>
            <div className="text-lg font-semibold">{item.value}</div>
            <div className="text-sm text-gray-500">{item.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

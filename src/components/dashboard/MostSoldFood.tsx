"use client";

import { getMostSoldFood , MostSoldFood} from "@/services/food.service";
import { useEffect, useState } from "react";


export default function MostSoldFoodComp() {

  const [mostSoldFoods, setMostSoldFoods] = useState<MostSoldFood[]>([])

  useEffect(() => {

    (async () => {
        const res = await getMostSoldFood();
        setMostSoldFoods(res)
    })()

  }, [])


  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4">
      <h3 className="text-lg font-semibold mb-4">Most Sold Foods</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider border-b">
            <tr>
              <th className="px-4 py-3">Food</th>
              <th className="px-4 py-3">Times Sold</th>
            </tr>
          </thead>
          <tbody>
            {mostSoldFoods.map((mostSoldFood, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-700">{mostSoldFood.food}</td>
                <td className="px-4 py-2">{mostSoldFood.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

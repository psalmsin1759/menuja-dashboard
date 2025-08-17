"use client";

import { useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import Image from "next/image";
import { Food } from "@/types/food";
import { useFood } from "@/contexts/food.context";
import Link from "next/link";

export default function MenuItem() {
  const { openModal } = useModal();
  const { foods, loading, deleteSelectedFood } = useFood();
  const [search, setSearch] = useState("");

  const deleteItem = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteSelectedFood(id);
    }
  };

  const filteredFoods = foods.filter((item: Food) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search food..."
          className="border border-gray-300 rounded px-3 py-2 w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => openModal("addFood")}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + Add Food
        </button>
      </div>

      {loading && (
        <div className="text-center py-6 text-gray-500">Loading foods...</div>
      )}

      <table className="min-w-full text-sm text-left border rounded overflow-hidden">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-4 py-2">Photo</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Available</th>
            <th className="px-4 py-2">Featured</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFoods.map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_FRONT_END_URL}${item.photo}`}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                  width={80}
                  height={80}
                />
              </td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">₦{item.price.toLocaleString()}</td>
              <td className="px-4 py-2">
                {item.available ? (
                  <span className="text-green-600">Yes</span>
                ) : (
                  <span className="text-red-500">No</span>
                )}
              </td>
              <td className="px-4 py-2">{item.feature ? "⭐" : "-"}</td>
              <td className="px-4 py-2 ">
                <div className="flex gap-2 items-center">
                  <Link
                    href={`/dashboard/menu/${item._id}`}
                    className="text-green-500 text-sm hover:underline"
                  >
                    Details
                  </Link>

                  <button
                    onClick={() => deleteItem(item._id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredFoods.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-400">
                No items found in this category.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

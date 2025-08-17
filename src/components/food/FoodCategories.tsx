"use client";

import { useCategory } from "@/contexts/category.context";
import { useModal } from "@/contexts/ModalContext";
import { Category } from "@/types/category";
import { CiTrash } from "react-icons/ci";

export default function FoodCategories() {
  const { openModal } = useModal();

  const {
    categories,
    selectedCategory,
    selectCategory,
    deleteSelectedCategory,
  } = useCategory();

  const handleDelete = (category: Category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete category "${category.name}"?`
    );
    if (confirmed) {
      deleteSelectedCategory(category._id);
    }
  };

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Menu Categories</h3>
        <button
          onClick={() => openModal("addCategory")}
          className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700"
        >
          + Add
        </button>
      </div>

      <ul className="space-y-2">
        {categories &&
          categories.map((cat: Category) => (
            <li
              key={cat._id}
              onClick={() => selectCategory(cat)}
              className={`cursor-pointer px-3 py-2 rounded ${
                selectedCategory === cat
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex justify-between">
                <span>{cat.name}</span>

                <button onClick={() => handleDelete(cat)}>
                  <CiTrash />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

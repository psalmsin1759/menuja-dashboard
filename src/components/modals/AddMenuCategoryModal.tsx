"use client";

import { useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useCategory } from "@/contexts/category.context";

export default function AddMenuCategoryModal() {

  const {addNewCategory} = useCategory();

  const { activeModal, closeModal } = useModal();
  const [name, setName] = useState("");

  if (activeModal !== "addCategory") return null;

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) return alert("Category name is required.");
    addNewCategory(trimmed);

    setName("");
    closeModal();
  };

  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm p-6 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-4">Add Menu Category</h3>

        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring focus:border-blue-400"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm text-gray-600 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

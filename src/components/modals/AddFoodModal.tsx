"use client";

import { useRef, useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import Image from "next/image";
import { useCategory } from "@/contexts/category.context";
import { toast } from "react-toastify";
import { CreateFoodDto } from "@/types/food";
import { useFood } from "@/contexts/food.context";

export default function AddFoodModal() {
  const { activeModal, closeModal } = useModal();
  const { selectedCategory } = useCategory();
  const {addNewFood, loading} = useFood()

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    available: true,
    feature: false,
  });

  const [image, setImage] = useState<File | null>(null);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      available: true,
      feature: false,
    });
    setImage(null);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !image || !selectedCategory) {
      return toast.error("Please fill all required fields.");
    }

    const input: CreateFoodDto = {
      ...formData,
      price: Number(formData.price),
      category: selectedCategory._id,
      photo: image,
    };

    addNewFood(input)
    resetForm()

   
  };

  if (activeModal !== "addFood") return null;

  const isDisabled =
    !formData.name || !formData.price || !image || !selectedCategory || loading;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Add New Food</h3>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Food name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 border px-3 py-2 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Food description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-3 border px-3 py-2 rounded"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full mb-3 border px-3 py-2 rounded"
        />

        {/* Upload / Drag & Drop */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full mb-3 h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50"
        >
          {image ? (
            <Image
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-24 object-contain"
              width={100}
              height={100}
            />
          ) : (
            <span>Click or drag & drop image here</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Checkboxes */}
        <div className="flex items-center justify-between mb-4">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            Available
          </label>

          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="feature"
              checked={formData.feature}
              onChange={handleChange}
            />
            Featured
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm text-gray-600 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`px-4 py-2 text-sm rounded text-white ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Food } from "@/types/food";
import { editFood, getFoodsById } from "@/services/food.service";
import { getCategories } from "@/services/category.service";
import { Category } from "@/types/category";
import Image from "next/image";
import { toast } from "react-toastify";

export default function FoodDetailsPage() {
  const { id } = useParams();
  const [food, setFood] = useState<Food | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getCategories();
      setCategories(res);
    })();
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchFood = async () => {
      try {
        const res = await getFoodsById(id.toString());
        setFood(res);
      } catch (err) {
        console.error("Error fetching food:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!food) return <p className="text-red-500">Food not found.</p>;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!food) return;
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFood({ ...food, [name]: (e.target as HTMLInputElement).checked });
    } else if (type === "number") {
      setFood({ ...food, [name]: parseFloat(value) });
    } else {
      setFood({ ...food, [name]: value });
    }
  };

  const handleFileChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFood({ ...food!, photo: url }); // local preview
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileChange(e.target.files[0]);
      e.target.value = ""; // reset input so same file can be reselected
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (!food) return;

    const data = new FormData();
    data.append("name", food.name);
    data.append("description", food.description || "");
    data.append("price", String(food.price));
    data.append("available", String(food.available));
    data.append("feature", String(food.feature));
    if (food.category?._id) data.append("category", food.category._id);

    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      data.append("photo", fileInput.files[0]);
    }

    const res = await editFood(data, id?.toString());
    console.log (res)
    if (res) {
        console.log ("alert")
      toast.success("Item updated");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Food Details</h1>

      <form className="space-y-4" onSubmit={handleSave}>
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            disabled={!isEditing}
            value={food.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 disabled:bg-gray-100"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            disabled={!isEditing}
            value={food.description || ""}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 disabled:bg-gray-100"
          />
        </div>

        {/* Photo */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Photo</label>
          <div
            className="w-full h-60 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer relative overflow-hidden"
            onDrop={isEditing ? handleDrop : undefined}
            onDragOver={isEditing ? (e) => e.preventDefault() : undefined}
            onClick={() =>
              isEditing && document.getElementById("fileInput")?.click()
            }
          >
            {preview || food.photo ? (
              <Image
                src={
                  preview ||
                  `${process.env.NEXT_PUBLIC_FRONT_END_URL}${food.photo}`
                }
                alt={food.name}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-gray-400">
                Drop or click to upload photo
              </span>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            disabled={!isEditing}
            value={food.price}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 disabled:bg-gray-100"
          />
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            disabled={!isEditing}
            checked={food.available}
            onChange={handleChange}
          />
          <label>Available</label>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="feature"
            disabled={!isEditing}
            checked={food.feature}
            onChange={handleChange}
          />
          <label>Featured</label>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={food.category?._id || ""}
            disabled={!isEditing}
            onChange={(e) =>
              setFood({
                ...food,
                category: { ...food.category!, _id: e.target.value },
              })
            }
            className="w-full border rounded-md px-3 py-2 disabled:bg-gray-100"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>

          {isEditing && (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Changes
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

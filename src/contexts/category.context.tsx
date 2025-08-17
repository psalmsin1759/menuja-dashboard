"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { Category } from "@/types/category";
import { addCategory, deleteCategory, getCategories } from "@/services/category.service";



interface CategoryContextType {
  categories: Category[];
  selectedCategory: Category | null;
  addNewCategory: (name: string) => Promise<void>;
  deleteSelectedCategory: (id: string) => Promise<void>;
  selectCategory: (category: Category) => void;
  refreshCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

 
  const refreshCategories = async () => {
     const res = await getCategories();
     setCategories(res); 
     
  };
  
  useEffect(() => {
    refreshCategories();
  }, []);

  

  useEffect(() => {
  if (categories.length > 0 && !selectedCategory) {
    setSelectedCategory(categories[0]);
  }
}, [categories]);

  const addNewCategory = async (name: string) => {
    const res = await addCategory(name);
    setCategories((prev) => [...prev, res]);
  };

  const deleteSelectedCategory = async (id: string) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c._id !== id));
      if (selectedCategory?._id === id) {
        setSelectedCategory(null);
      }
  };

  const selectCategory = (category: Category) => {
    setSelectedCategory(category);
  };


  return (
    <CategoryContext.Provider
      value={{
        categories,
        selectedCategory,
        addNewCategory,
        deleteSelectedCategory,
        selectCategory,
        refreshCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};


export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CreateFoodDto, Food } from "@/types/food";
import { getFoodsByCategory, addFood, deleteFood } from "@/services/food.service";
import { useCategory } from "./category.context";
import { useModal } from "./ModalContext";

interface FoodContextType {
  foods: Food[];
  loading: boolean;
  refreshFoods: () => Promise<void>;
  addNewFood: (data: CreateFoodDto) => Promise<void>;
  deleteSelectedFood: (id: string) => Promise<void>;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const { selectedCategory } = useCategory();
  const { closeModal } = useModal();

  // fetch foods whenever category changes
  const refreshFoods = async () => {
    if (!selectedCategory?._id) {
      setFoods([]);
      return;
    }
    try {
      setLoading(true);
      const res = await getFoodsByCategory(selectedCategory._id);
      setFoods(res || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const addNewFood = async (data: CreateFoodDto) => {
    try {
      setLoading(true);
      const res = await addFood(data);
      if (res) {
        if (res.category === selectedCategory?._id) {
          setFoods((prev) => [...prev, res]);
        }
        closeModal();
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteSelectedFood = async (id: string) => {
    try {
      setLoading(true);
      await deleteFood(id);
      setFoods((prev) => prev.filter((f) => f._id !== id));
    } finally {
      setLoading(false);
    }
  };

  return (
    <FoodContext.Provider
      value={{
        foods,
        loading,
        refreshFoods,
        addNewFood,
        deleteSelectedFood,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
};

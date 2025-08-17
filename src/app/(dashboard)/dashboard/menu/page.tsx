import FoodCategories from "@/components/food/FoodCategories";
import FoodItem from "@/components/food/FoodItem";
import AddFoodModal from "@/components/modals/AddFoodModal";
import AddMenuCategoryModal from "@/components/modals/AddMenuCategoryModal";
import { CategoryProvider } from "@/contexts/category.context";
import { FoodProvider } from "@/contexts/food.context";
import React from "react";

export default function MenuPage() {
  return (
    <CategoryProvider>
      <FoodProvider>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div className="md:col-span-1">
            <FoodCategories />
          </div>
          <div className="md:col-span-2">
            <FoodItem />
          </div>
        </div>

        <AddFoodModal />
        <AddMenuCategoryModal />
      </FoodProvider>
    </CategoryProvider>
  );
}

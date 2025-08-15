"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const SelectedCategoryContext = createContext<{
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}>({ selectedCategory: "Main Course", setSelectedCategory: () => {} });

export const SelectedCategoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState("Main Course");

  return (
    <SelectedCategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </SelectedCategoryContext.Provider>
  );
};

export const useSelectedCategory = () => useContext(SelectedCategoryContext);

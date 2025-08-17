import { Category } from "./category";

export interface Food {
  _id: string;
  name: string;
  description?: string;
  photo?: string;
  price: number;
  available: boolean;
  feature: boolean;
  category?: Category;
}

export interface CreateFoodDto {
  name: string;
  description: string;
  price: number;
  available: boolean;
  feature: boolean;
  category: string; 
  photo?: File; 
}
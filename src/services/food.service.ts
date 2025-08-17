import api from "@/lib/axios";
import { CreateFoodDto, Food } from "@/types/food";
import { handleApiError } from "@/utils/handleApiError";

export interface MostSoldFood {
  count: number;
  food: string;
}

const URL = "foods";

export async function getMostSoldFood(): Promise<MostSoldFood[]> {
  try {
    const res = await api.get("orders/analytics/most-sold-foods");
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getFoods(): Promise<Food[]> {
  try {
    const res = await api.get(URL);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getFoodsById(id: string): Promise<Food> {
  try {
    const res = await api.get(`${URL}/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getFoodsByCategory(categoryId: string): Promise<Food[]> {
  try {
    const res = await api.get(`${URL}/category/${categoryId}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function addFood(data: CreateFoodDto): Promise<Food> {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("available", String(data.available));
    formData.append("feature", String(data.feature));
    formData.append("category", data.category);

    if (data.photo) {
      formData.append("photo", data.photo);
    }

    const res = await api.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function editFood(formData: FormData, id: string): Promise<Food> {
  try {
    const res = await api.put(`${URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteFood(id: string) {
  try {
    const res = await api.delete(`${URL}/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}

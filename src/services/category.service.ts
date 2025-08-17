import api from "@/lib/axios";
import { Category } from "@/types/category";
import { handleApiError } from "@/utils/handleApiError";

const URL = "categories";

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await api.get(URL);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function addCategory(name: string) {
  try {
    const res = await api.post(URL, {name} )
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}


export async function deleteCategory(id: string) {
  try {
    const res = await api.delete(`${URL}/${id}`)
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}
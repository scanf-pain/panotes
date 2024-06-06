import { Category } from "../models/categories";
import baseApi from "./baseApi";

const getAllCategories = async () => {
  return baseApi.get("/category");
};

const getCategory = async (categoryName: string) => {
  return baseApi.get(`/category/${categoryName}`);
};

const updateCategory = async (categoryName: string, categoryEdit: Category) => {
  return baseApi.put(`/category/${categoryName}`, categoryEdit);
};

const deleteCategory = async (categoryName: string) => {
  return baseApi.delete(`/category/${categoryName}`);
};

const categoryApi = {
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};

export default categoryApi;

import { TaskEdit } from "../models/task";
import baseApi from "./baseApi";
const getAllTasks = async () => {
  return baseApi.get("/notes");
};

const getTasksOfCategory = async (category: string) => {
  return baseApi.get(`/tasks?category${category}`);
};

const getTask = async (taskId: string) => {
  return baseApi.get(`/tasks/${taskId}`);
};

const updateTask = async (taskId: string, taskEdit: TaskEdit) => {
  return baseApi.put(`/tasks/${taskId}`, taskEdit);
};

const deleteTask = async (taskId: string) => {
  return baseApi.delete(`/tasks/${taskId}`);
};

const taskApi = {
  getAllTasks,
  getTasksOfCategory,
  getTask,
  updateTask,
  deleteTask,
};

export default taskApi;

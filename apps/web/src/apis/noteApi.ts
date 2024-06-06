import { NoteEdit } from "../models/note";
import baseApi from "./baseApi";
const getAllNotes = async () => {
  return baseApi.get("/notes");
};

const getNotesOfCategory = async (category: string) => {
  return baseApi.get(`/notes?category${category}`);
};

const getNote = async (noteId: string) => {
  return baseApi.get(`/notes/${noteId}`);
};

const updateNote = async (noteId: string, noteEdit: NoteEdit) => {
  return baseApi.put(`/notes/${noteId}`, noteEdit);
};

const deleteNote = async (noteId: string) => {
  return baseApi.delete(`/notes/${noteId}`);
};

const noteApi = {
  getAllNotes,
  getNotesOfCategory,
  getNote,
  updateNote,
  deleteNote,
};

export default noteApi;

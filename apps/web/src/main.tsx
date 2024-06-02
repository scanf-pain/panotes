import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFoundPage from "./pages/NotFoundPage";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/HomePage";

import "@repo/ui/styles.css";
import "./globals.css";
import CreateNotePage from "./pages/CreateNotePage";
import EditNotePage from "./pages/EditNotePage";
import NoteDetailPage from "./pages/NoteDetailPage";

const router = createBrowserRouter([
  {
    path: "/app",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "create/:noteId",
        element: <CreateNotePage />,
      },
      {
        path: "edit/:noteId",
        element: <EditNotePage />,
      },
      {
        path: "note/:noteId",
        element: <NoteDetailPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

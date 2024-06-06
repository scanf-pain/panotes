import { HttpResponse, http } from "msw";
import { mockNotes } from "./mockData/mockNotes";
import { mockTasks } from "./mockData/mockTasks";

export const handlers = [
  /**
   * Notes
   */
  http.get("/notes", ({ request }) => {
    console.log(`Captured a "GET /notes" request: ${request.url}`);
    const url = new URL(request.url);

    const filtercategory = url.searchParams.get("category");

    if (!filtercategory) {
      return HttpResponse.json(mockNotes);
    }
    return HttpResponse.json(
      mockNotes.filter((note) => {
        const categories = note.category;
        if (!categories) return false;
        for (const category of categories) {
          if (category.name === filtercategory) return true;
        }
        return false;
      }),
      { status: 200 }
    );
  }),

  http.post("/notes", ({ request }) => {
    console.log(`Captured a "POST /notes" request with request: ${request}`);
  }),

  http.get("/notes/:id", ({ params }) => {
    console.log(`Captured a "GET /notes${params.id}" request`);
    const found = mockNotes.find((note) => {
      note.id === params.id;
    });
    if (!found) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(found, { status: 200 });
  }),

  http.put("/notes/:id", ({ params, request }) => {
    console.log(
      `Captured a "PUT /notes/${params.id}" request with request: ${request}`
    );
  }),

  http.delete("/notes/:id", ({ params }) => {
    console.log(`Captured a "DELETE /notes/${params.id}" request`);
  }),

  /**
   * Tasks
   * */
  http.get("/tasks", ({ request }) => {
    console.log(`Captured a "GET /tasks" request: ${request.url}`);
    const url = new URL(request.url);

    const filtercategory = url.searchParams.get("category");

    if (!filtercategory) {
      return new HttpResponse(null, { status: 200 });
    }

    const found = mockTasks.find((task) => {
      const category = task.category;
      if (!category) return false;
      return category.name === filtercategory;
    });

    if (!found) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(found, { status: 200 });
  }),

  http.post("/tasks", ({ request }) => {
    console.log(`Captured a "POST /tasks" request with request: ${request}`);
  }),

  http.get("/tasks/:id", ({ params }) => {
    console.log(`Captured a "GET /tasks${params.id}" request`);
    const found = mockNotes.find((task) => {
      task.id === params.id;
    });
    if (!found) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(found, { status: 200 });
  }),

  http.put("/tasks/:id", ({ params, request }) => {
    console.log(
      `Captured a "PUT /tasks/${params.id}" request with request: ${request}`
    );
  }),
  http.delete("/tasks/:id", ({ params }) => {
    console.log(`Captured a "DELETE /tasks/${params.id}" request`);
  }),

  /**
   * Categories
   * */
  http.get("/tasks", () => {
    console.log(`Captured a "GET /categories" request`);
  }),

  http.post("/tasks", ({ request }) => {
    console.log(
      `Captured a "POST /categories" request with request: ${request}`
    );
  }),

  http.get("/tasks/:id", ({ params }) => {
    console.log(`Captured a "GET /categories${params.id}" request`);
  }),

  http.put("/tasks/:id", ({ params, request }) => {
    console.log(
      `Captured a "PUT /categories/${params.id}" request with request: ${request}`
    );
  }),

  http.delete("/tasks/:id", ({ params }) => {
    console.log(`Captured a "DELETE /categories/${params.id}" request`);
  }),
];

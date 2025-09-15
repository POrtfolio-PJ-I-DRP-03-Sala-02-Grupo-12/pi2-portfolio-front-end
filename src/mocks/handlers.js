import { rest } from "msw";
import { mockProjects } from "../data/projects";

let projects = mockProjects;

export const handlers = [
  rest.get("/api/projects", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(projects));
  }),

  rest.post("/api/projects", async (req, res, ctx) => {
    const data = await req.json();
    const newProject = { ...data, id: Date.now() };
    projects.push(newProject);
    return res(ctx.status(201), ctx.json(newProject));
  }),

  rest.put("/api/projects/:id", async (req, res, ctx) => {
    const id = Number(req.params.id);
    const updated = await req.json();
    projects = projects.map((p) => (p.id === id ? updated : p));
    return res(ctx.status(200), ctx.json(updated));
  }),

  rest.delete("/api/projects/:id", (req, res, ctx) => {
    const id = Number(req.params.id);
    projects = projects.filter((p) => p.id !== id);
    return res(ctx.status(200), ctx.json({ id }));
  }),
];

import { useEffect, useState } from "react";

// ✅ Load the API base URL from the environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useProjectsAPI() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then(setProjects)
      .catch((err) => {
        console.error("[useProjectsAPI] Error loading projects:", err);
        setProjects([]); // fallback to empty array
      });
  }, []);

  const addProject = async (data) => {
    const res = await fetch(`${API_BASE_URL}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const newProject = await res.json();
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = async (data) => {
    const res = await fetch(`${API_BASE_URL}/api/projects/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updated = await res.json();
    setProjects((prev) => prev.map((p) => (p.id === data.id ? updated : p)));
  };

  const deleteProject = async (id) => {
    await fetch(`${API_BASE_URL}/api/projects/${id}`, {
      method: "DELETE",
    });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return [projects, { addProject, updateProject, deleteProject }];
}

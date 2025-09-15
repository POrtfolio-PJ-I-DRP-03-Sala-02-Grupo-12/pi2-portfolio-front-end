// src/hooks/useProjects.js
import { useState, useEffect } from "react";
import { mockProjects } from "../data/projects";

const STORAGE_KEY = "gabisou-projects";

export const useProjects = () => {
  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : mockProjects;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  return [projects, setProjects];
};

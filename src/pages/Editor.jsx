import { useState } from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-react";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import ProjectViewerModal from "../components/ProjectViewerModal";
import { useProjectsAPI } from "../hooks/useProjectsAPI";
import { Navigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Editor = () => {
  const { isHighContrast } = useTheme();
  const { isLoggedIn } = useUser(); // ✅ Clerk hook used correctly

  const [projects, { addProject, updateProject, deleteProject }] =
    useProjectsAPI();
  const [editingProject, setEditingProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
    console.log("Logout");
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleDelete = (project) => {
    if (confirm(`Delete "${project.title}"?`)) {
      deleteProject(project.id);
    }
  };

  const handleSave = (project) => {
    if (project.id) {
      updateProject(project);
    } else {
      addProject(project);
    }
  };

  const handleView = (project) => {
    setSelectedProject(project);
    setViewerOpen(true);
  };

  return (
    <>
      <SignedIn>
        <div className="pb-24 bg-gabisou-primary">
          <h1 className="text-3xl font-bold pt-5 pb-10 flex justify-center text-white">
            Portfolio
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isLoggedIn={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClick={() => handleView(project)}
              />
            ))}
          </div>

          <ProjectModal
            visible={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            project={editingProject}
            projectList={projects}
          />

          <ProjectViewerModal
            visible={viewerOpen}
            onClose={() => setViewerOpen(false)}
            project={selectedProject}
          />

          {
            <button
              className="fixed bottom-20 right-4 sm:right-8 text-lg px-6 py-3 font-semibold rounded shadow-lg bg-stone-800 text-stone-100 border-1 border-stone-500 hover:bg-stone-950 cursor-pointer z-40"
              onClick={() => {
                setEditingProject(null);
                setModalOpen(true);
              }}
            >
              ➕ Add Project
            </button>
          }

          {
            <button
              className="fixed bottom-20 left-4 sm:left-8 text-lg px-6 py-3 font-semibold rounded shadow-lg bg-gabisou-red text-stone-100 border-1 border-stone-500 hover:bg-gabisou-dark-red cursor-pointer z-40"
              onClick={() => {
                handleLogout();
              }}
            >
              LOGOUT
            </button>
          }
        </div>
      </SignedIn>
      <SignedOut>
        <Navigate to="/" replace />;
      </SignedOut>
    </>
  );
};

export default Editor;

import { useState, useEffect } from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import ProjectViewerModal from "../components/ProjectViewerModal";

import useGameAPI from "../hooks/useGameAPI";
import useGameImagesAPI from "../hooks/useGameImagesAPI";
import useGameTagAPI from "../hooks/useGameTagAPI";
import useTagAPI from "../hooks/useTagAPI";

const EditorGames = () => {
  const { isLoggedIn } = useUser();
  const { signOut } = useClerk();

  // =========================
  // HOOKS
  // =========================
  const { games, createGame, updateGame, deleteGame, fetchGames } =
    useGameAPI();
  const { images, createImage, deleteImagesByGame, fetchImages } =
    useGameImagesAPI();
  const { gameTags, createGameTag, deleteGameTagsByGame, fetchGameTags } =
    useGameTagAPI();
  const { tags, fetchTags } = useTagAPI();

  // =========================
  // STATE
  // =========================
  const [projects, setProjects] = useState([]);

  const [editingProject, setEditingProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    fetchGames();
    fetchImages();
    fetchGameTags();
    fetchTags();
  }, []);

  // =========================
  // NORMALIZAÇÃO (ESSENCIAL)
  // =========================
  useEffect(() => {
    const normalized = games.map((game) => {
      const gameImages = images.filter((img) => img.gameId === game.id);

      const relatedTags = gameTags
        .filter((gt) => gt.gameId === game.id)
        .map((gt) => tags.find((t) => t.id === gt.tagId))
        .filter(Boolean);

      return {
        ...game,
        images: gameImages,
        tags: relatedTags,
      };
    });

    setProjects(normalized);
  }, [games, images, gameTags, tags]);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  // =========================
  // CRUD
  // =========================
  const handleDelete = async (project) => {
    if (confirm(`Delete "${project.title}"?`)) {
      await deleteGame(project.id);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleView = (project) => {
    setSelectedProject(project);
    setViewerOpen(true);
  };

  // 🔥 SALVAMENTO COMPLETO
  const handleSave = async (payload) => {
    try {
      let gameId = payload.game.id;

      // GAME
      if (gameId) {
        await updateGame(gameId, payload.game);
      } else {
        const newGame = await createGame(payload.game);
        gameId = newGame.id;
      }

      // LIMPA RELAÇÕES
      await Promise.all([
        deleteImagesByGame(gameId),
        deleteGameTagsByGame(gameId),
      ]);

      // CRIA NOVAS
      await Promise.all([
        ...payload.images.map((img) => createImage({ ...img, gameId })),
        ...payload.gameTags.map((gt) =>
          createGameTag({ gameId, tagId: gt.tagId }),
        ),
      ]);

      // 🔁 reload
      await fetchGames();
      await fetchImages();
      await fetchGameTags();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar.");
    }
  };

  // =========================
  // UI
  // =========================
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
            games={games}
            tags={tags}
          />

          <ProjectViewerModal
            visible={viewerOpen}
            onClose={() => setViewerOpen(false)}
            project={selectedProject}
          />

          {/* ADD */}
          <button
            className="fixed bottom-20 right-4 px-6 py-3 bg-stone-800 text-white rounded"
            onClick={() => {
              setEditingProject(null);
              setModalOpen(true);
            }}
          >
            ➕ Add Game
          </button>

          {/* LOGOUT */}
          <button
            className="fixed bottom-20 left-4 px-6 py-3 bg-red-600 text-white rounded"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </div>
      </SignedIn>

      <SignedOut>
        <Navigate to="/" replace />
      </SignedOut>
    </>
  );
};

export default EditorGames;

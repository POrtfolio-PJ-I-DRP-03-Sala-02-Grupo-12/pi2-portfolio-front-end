import { useState } from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-react";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import ProjectViewerModal from "../components/ProjectViewerModal";
import { useGamesAPI } from "../hooks/useGamesAPI";
import { Navigate } from "react-router-dom";

const Editor = () => {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  const [games, { addGame, updateGame, deleteGame }] = useGamesAPI();
  const [editingGame, setEditingGame] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedGame, setSelectedGame] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  const handleEdit = (game) => {
    setEditingGame(game);
    setModalOpen(true);
  };

  const handleDelete = (game) => {
    if (confirm(`Delete "${game.title}"?`)) {
      deleteGame(game.id);
    }
  };

  const handleSave = (game) => {
    if (game.id) {
      updateGame(game);
    } else {
      addGame(game);
    }
  };

  const handleView = (game) => {
    setSelectedGame(game);
    setViewerOpen(true);
  };

  return (
    <>
      <SignedIn>
        <div className="pb-24 bg-gabisou-primary">
          <h1 className="text-3xl font-bold pt-5 pb-10 flex justify-center text-white">
            Games Editor
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {games.map((game) => (
              <ProjectCard
                key={game.id}
                project={game}
                isLoggedIn={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClick={() => handleView(game)}
              />
            ))}
          </div>

          <ProjectModal
            visible={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            project={editingGame}
            projectList={games}
          />

          <ProjectViewerModal
            visible={viewerOpen}
            onClose={() => setViewerOpen(false)}
            project={selectedGame}
          />

          <button
            className="fixed bottom-20 right-4 sm:right-8 text-lg px-6 py-3 font-semibold rounded shadow-lg bg-stone-800 text-stone-100 border-1 border-stone-500 hover:bg-stone-950 cursor-pointer z-40"
            onClick={() => {
              setEditingGame(null);
              setModalOpen(true);
            }}
          >
            ➕ Add Game
          </button>

          <button
            className="fixed bottom-20 left-4 sm:left-8 text-lg px-6 py-3 font-semibold rounded shadow-lg bg-gabisou-red text-stone-100 border-1 border-stone-500 hover:bg-gabisou-dark-red cursor-pointer z-40"
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

export default Editor;

import { useState, useMemo } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectViewerModal from "../components/ProjectViewerModal";

import { useGameAPI } from "../hooks/useGameAPI";
import { useGameImagesAPI } from "../hooks/useGameImagesAPI";
import { useGameTagAPI } from "../hooks/useGameTagAPI";
import { useTagAPI } from "../hooks/useTagAPI";

const Home = () => {
  const [games] = useGameAPI();
  const [images] = useGameImagesAPI();
  const [gameTags] = useGameTagAPI();
  const [tags] = useTagAPI();

  const [selectedGame, setSelectedGame] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const handleView = (game) => {
    setSelectedGame(game);
    setViewerOpen(true);
  };

  // 🔥 Monta os dados completos (game + images + tags)
  const gamesWithDetails = useMemo(() => {
    if (!Array.isArray(games)) return [];

    return games.map((game) => {
      const gameImages = images?.filter((img) => img.gameId === game.id) || [];

      const relatedGameTags =
        gameTags?.filter((gt) => gt.gameId === game.id) || [];

      const gameTagsFull = relatedGameTags
        .map((gt) => tags?.find((tag) => tag.id === gt.tagId))
        .filter(Boolean);

      return {
        ...game,
        images: gameImages,
        tags: gameTagsFull,
      };
    });
  }, [games, images, gameTags, tags]);

  return (
    <div className="pb-24 bg-gabisou-primary">
      <h1 className="text-3xl font-bold pt-5 pb-10 flex justify-center text-white">
        Portfolio
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {gamesWithDetails.map((game) => (
          <ProjectCard
            key={game.id}
            project={game} // mantém compatibilidade com o componente
            isLoggedIn={false}
            onClick={() => handleView(game)}
          />
        ))}
      </div>

      <ProjectViewerModal
        visible={viewerOpen}
        onClose={() => setViewerOpen(false)}
        project={selectedGame} // mantém compatibilidade
      />
    </div>
  );
};

export default Home;

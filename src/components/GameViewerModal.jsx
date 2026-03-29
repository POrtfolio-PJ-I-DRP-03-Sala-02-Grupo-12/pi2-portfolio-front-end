import { useMemo } from "react";
import useGameImagesAPI from "../hooks/useGameImagesAPI";
import useGameTagAPI from "../hooks/useGameTagAPI";
import useTagAPI from "../hooks/useTagAPI";

const GameViewerModal = ({ visible, onClose, game }) => {
  const { images } = useGameImagesAPI();
  const { gameTags } = useGameTagAPI();
  const { tags } = useTagAPI();

  if (!visible || !game) return null;

  const gameImages = useMemo(() => {
    return images.filter((img) => img.gameId === game.id);
  }, [images, game.id]);

  const gameTagRelations = useMemo(() => {
    return gameTags.filter((gt) => gt.gameId === game.id);
  }, [gameTags, game.id]);

  const gameTagsResolved = useMemo(() => {
    return gameTagRelations
      .map((gt) => tags.find((t) => t.id === gt.tagId))
      .filter(Boolean);
  }, [gameTagRelations, tags]);

  const cover = gameImages[0];
  const cover2 = gameImages[1];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-stone-800 p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-stone-100 hover:text-stone-400 text-3xl leading-none w-10 h-10 flex items-center justify-center cursor-pointer"
          aria-label="Close viewer"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-stone-100 mb-1">{game.title}</h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {gameTagsResolved.map((tag) => (
            <span
              key={tag.id}
              className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-stone-100 mb-4 whitespace-pre-line">
          {game.description}
        </p>

        {/* Images */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {cover && (
            <img
              src={cover.url}
              alt={cover.description}
              className="w-full sm:w-1/2 rounded-lg object-cover"
            />
          )}

          {cover2 && (
            <img
              src={cover2.url}
              alt={cover2.description}
              className="w-full sm:w-1/2 rounded-lg object-cover"
            />
          )}
        </div>

        {/* Link */}
        {game.linkUrl && (
          <a
            href={game.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline font-medium hover:text-blue-600"
          >
            {game.linkLabel || game.linkUrl}
          </a>
        )}
      </div>
    </div>
  );
};

export default GameViewerModal;

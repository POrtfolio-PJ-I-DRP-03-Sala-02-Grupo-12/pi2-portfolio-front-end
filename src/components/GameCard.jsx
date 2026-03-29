const GameCard = ({
  game,
  images = [],
  tags = [],
  gameTags = [],
  isLoggedIn,
  onEdit,
  onDelete,
  onClick,
}) => {
  const coverImage =
    images.find((img) => img.gameId === game.id && img.isCover) ||
    images.find((img) => img.gameId === game.id);

  const relatedTagIds = gameTags
    .filter((gt) => gt.gameId === game.id)
    .map((gt) => gt.tagId);

  const relatedTags = tags.filter((tag) => relatedTagIds.includes(tag.id));

  return (
    <div
      onClick={() => onClick?.(game)}
      className="bg-stone-800 m-5 shadow-md rounded-lg overflow-hidden relative hover:shadow-xl transition cursor-pointer"
    >
      <img
        src={coverImage?.url || "/placeholder.png"}
        alt={`Cover for ${game.title}`}
        className="w-full aspect-video object-cover text-stone-100"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-stone-100">{game.title}</h2>

        <div className="flex flex-wrap gap-2 mt-2">
          {relatedTags.map((tag) => (
            <span
              key={tag.id}
              className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {isLoggedIn && (
        <div
          className="absolute top-2 right-2 flex gap-2 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="text-sm text-stone-100 hover:text-stone-400 cursor-pointer"
            onClick={() => onEdit?.(game)}
          >
            ✏️
          </button>

          <button
            className="text-sm text-stone-100 hover:text-stone-400 cursor-pointer"
            onClick={() => onDelete?.(game)}
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
};

export default GameCard;

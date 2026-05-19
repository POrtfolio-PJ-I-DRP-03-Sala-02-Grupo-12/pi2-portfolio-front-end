import OptimizedImage from "./OptimizedImage";

const CARD_IMAGE_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

const ProjectCard = ({
  project,
  isLoggedIn,
  onEdit,
  onDelete,
  onClick,
  priority = false,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-stone-800 m-5 shadow-md rounded-lg overflow-hidden relative hover:shadow-xl transition cursor-pointer"
    >
      <OptimizedImage
        src={project.cover}
        alt={project.coverDescription || `Cover for ${project.title}`}
        priority={priority}
        sizes={CARD_IMAGE_SIZES}
        wrapperClassName="w-full aspect-video"
        className="h-full w-full object-cover text-stone-100"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-stone-100">{project.title}</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded"
            >
              {tag}
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
            onClick={() => onEdit(project)}
          >
            ✏️
          </button>
          <button
            className="text-sm text-stone-100 hover:text-stone-400 cursor-pointer"
            onClick={() => onDelete(project)}
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;

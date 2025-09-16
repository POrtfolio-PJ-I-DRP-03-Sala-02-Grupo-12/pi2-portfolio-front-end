const ProjectViewerModal = ({ visible, onClose, project }) => {
  if (!visible || !project) return null;

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
        <h2 className="text-2xl font-bold text-stone-100 mb-1">
          {project.title}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-stone-100 mb-4 whitespace-pre-line">
          {project.description}
        </p>

        {/* Images */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <img
            src={project.cover}
            alt="Main cover"
            //alt={project.coverDescription}
            className="w-full sm:w-1/2 rounded-lg object-cover"
          />
          <img
            src={project.cover2}
            alt="Second cover"
            //alt={project.cover2Description}
            className="w-full sm:w-1/2 rounded-lg object-cover"
          />
        </div>

        {/* Link */}
        {project.linkUrl && (
          <a
            href={project.linkUrl}
            //alt={linkUrlDescription}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline font-medium hover:text-blue-600"
          >
            {
              project.linkLabel || project.linkUrl
              //|| project.linkUrlDescription
            }
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectViewerModal;

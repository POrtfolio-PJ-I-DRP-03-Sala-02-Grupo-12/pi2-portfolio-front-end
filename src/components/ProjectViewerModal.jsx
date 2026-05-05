import { useEffect } from "react";
import ReactGA from "react-ga4";

const ProjectViewerModal = ({ visible, onClose, project }) => {
  if (!visible || !project) return null;

  // event project view
  useEffect(() => {
    if (visible && project) {
      ReactGA.event("project_view", {
        project_title: project.title,
      });
    }
  }, [visible, project]);

  // event click on link
  const handleLinkClick = () => {
    ReactGA.event("project_link_click", {
      project_title: project.title,
      link_url: project.linkUrl,
    });
  };

  // event click on image
  const handleImageClick = (imageType) => {
    ReactGA.event("project_image_click", {
      project_title: project.title,
    });
  };

  // event click on tag
  const handleTagClick = (tag) => {
    ReactGA.event("project_tag_click", {
      project_title: project.title,
      tag_name: tag,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-stone-800 p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        <button
          onClick={() => {
            ReactGA.event("project_close", {
              project_title: project.title,
            });
            onClose();
          }}
          className="absolute top-2 right-2 text-stone-100 hover:text-stone-400 text-3xl leading-none w-10 h-10 flex items-center justify-center cursor-pointer"
          aria-label="Close viewer"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-stone-100 mb-1">
          {project.title}
        </h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag, idx) => (
            <span
              key={idx}
              onClick={() => handleTagClick(tag)}
              className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-stone-100 mb-4 whitespace-pre-line">
          {project.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <img
            src={project.cover}
            alt={project.coverDescription}
            onClick={() => handleImageClick("cover_1")}
            className="w-full sm:w-1/2 rounded-lg object-cover cursor-pointer"
          />
          <img
            src={project.cover2}
            alt={project.cover2Description}
            onClick={() => handleImageClick("cover_2")}
            className="w-full sm:w-1/2 rounded-lg object-cover cursor-pointer"
          />
        </div>

        {project.linkUrl && (
          <a
            href={project.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="text-blue-400 underline font-medium hover:text-blue-600"
          >
            {project.linkLabel || project.linkUrl}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectViewerModal;

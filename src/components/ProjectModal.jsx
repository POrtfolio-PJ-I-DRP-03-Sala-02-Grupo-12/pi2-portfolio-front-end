import { useState, useEffect } from "react";

const ProjectModal = ({
  visible,
  onClose,
  onSave,
  project,
  projectList = [],
}) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [cover, setCover] = useState("");
  const [cover2, setCover2] = useState("");
  const [description, setDescription] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setTags(project.tags?.join(", ") || "");
      setCover(project.cover || "");
      setCover2(project.cover2 || "");
      setDescription(project.description || "");
      setLinkLabel(project.linkLabel || "");
      setLinkUrl(project.linkUrl || "");
    } else {
      setTitle("");
      setTags("");
      setCover("");
      setCover2("");
      setDescription("");
      setLinkLabel("");
      setLinkUrl("");
    }
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const duplicate = projectList.some(
      (p) =>
        p.title.toLowerCase() === title.trim().toLowerCase() &&
        p.id !== project?.id
    );

    if (duplicate) {
      alert("A project with this title already exists.");
      return;
    }

    onSave({
      ...project,
      title,
      tags: tagList,
      description,
      cover,
      cover2,
      linkLabel,
      linkUrl,
    });

    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gabisou-primary rounded-lg shadow-lg w-full max-w-md max-h-[calc(100vh-5.5rem)] overflow-y-auto p-6 mb-[5.5rem]">
        <h2 className="text-xl font-bold mb-4 text-stone-100">
          {project ? "Edit Project" : "Add Project"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-100">
              Title
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-stone-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-100">
              Tags (comma-separated)
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-stone-100"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-100">
              Cover Image URL
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-stone-100"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-100">
              Second Image URL
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-stone-100"
              value={cover2}
              onChange={(e) => setCover2(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-100">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 rounded bg-stone-100"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-100">
              Link Text
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-stone-100"
              value={linkLabel}
              onChange={(e) => setLinkLabel(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-100">
              Link URL
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-stone-100"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2  bg-stone-700 text-stone-100 border-1 border-stone-500 rounded-lg hover:bg-stone-900 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-stone-800 text-stone-100 border-1 border-stone-500 rounded-lg hover:bg-stone-950 cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;

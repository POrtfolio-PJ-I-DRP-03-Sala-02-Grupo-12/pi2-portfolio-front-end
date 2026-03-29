import { useState, useEffect } from "react";

const GameModal = ({
  visible,
  onClose,
  onSave,
  project,
  games = [],
  tags = [], // lista vinda do useTagAPI
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  // imagens
  const [images, setImages] = useState([{ url: "", description: "" }]);

  // tags selecionadas (ids)
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setLinkLabel(project.linkLabel || "");
      setLinkUrl(project.linkUrl || "");

      // images
      setImages(
        project.images?.length
          ? project.images
          : [{ url: "", description: "" }],
      );

      // tags (ids)
      setSelectedTags(project.tags?.map((t) => t.id) || []);
    } else {
      setTitle("");
      setDescription("");
      setLinkLabel("");
      setLinkUrl("");
      setImages([{ url: "", description: "" }]);
      setSelectedTags([]);
    }
  }, [project]);

  const handleAddImage = () => {
    setImages([...images, { url: "", description: "" }]);
  };

  const handleImageChange = (index, field, value) => {
    const updated = [...images];
    updated[index][field] = value;
    setImages(updated);
  };

  const handleTagToggle = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // valida duplicidade
    const duplicate = games.some(
      (g) =>
        g.title.toLowerCase() === title.trim().toLowerCase() &&
        g.id !== project?.id,
    );

    if (duplicate) {
      alert("A game with this title already exists.");
      return;
    }

    // estrutura final
    const payload = {
      game: {
        id: project?.id,
        title,
        description,
        linkLabel,
        linkUrl,
      },
      images: images.filter((img) => img.url), // remove vazias
      gameTags: selectedTags.map((tagId) => ({
        tagId,
      })),
    };

    onSave(payload);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gabisou-primary rounded-lg shadow-lg w-full max-w-md max-h-[calc(100vh-5.5rem)] overflow-y-auto p-6 mb-[5.5rem]">
        <h2 className="text-xl font-bold mb-4 text-stone-100">
          {project ? "Edit Game" : "Add Game"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TITLE */}
          <div>
            <label className="block text-sm text-stone-100">Title*</label>
            <input
              className="w-full px-3 py-2 rounded bg-stone-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm text-stone-100">Description*</label>
            <textarea
              className="w-full px-3 py-2 rounded bg-stone-100"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* IMAGES */}
          <div>
            <label className="block text-sm text-stone-100 mb-2">Images*</label>

            {images.map((img, index) => (
              <div key={index} className="space-y-2 mb-3">
                <input
                  type="url"
                  placeholder="Image URL"
                  className="w-full px-3 py-2 rounded bg-stone-100"
                  value={img.url}
                  onChange={(e) =>
                    handleImageChange(index, "url", e.target.value)
                  }
                  required
                />
                <textarea
                  placeholder="Image description"
                  className="w-full px-3 py-2 rounded bg-stone-100"
                  value={img.description}
                  onChange={(e) =>
                    handleImageChange(index, "description", e.target.value)
                  }
                />
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddImage}
              className="text-sm text-blue-300 hover:underline"
            >
              + Add image
            </button>
          </div>

          {/* TAGS */}
          <div>
            <label className="block text-sm text-stone-100 mb-2">Tags*</label>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag.id}
                  onClick={() => handleTagToggle(tag.id)}
                  className={`px-2 py-1 rounded border ${
                    selectedTags.includes(tag.id)
                      ? "bg-blue-600 text-white"
                      : "bg-stone-200"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* LINK */}
          <div>
            <label className="block text-sm text-stone-100">Link Label</label>
            <input
              className="w-full px-3 py-2 rounded bg-stone-100"
              value={linkLabel}
              onChange={(e) => setLinkLabel(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-stone-100">Link URL</label>
            <input
              type="url"
              className="w-full px-3 py-2 rounded bg-stone-100"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-stone-700 text-white rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameModal;

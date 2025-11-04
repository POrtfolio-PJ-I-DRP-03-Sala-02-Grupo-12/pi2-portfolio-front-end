import { useState, useEffect } from "react";

const ProjectModal = ({
  visible,
  onClose,
  onSave,
  project,
  projectList = [],
  availableTags = [],
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([
    { url: "", title: "", description: "" },
  ]);

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setLinkLabel(project.link_name || "");
      setLinkUrl(project.link_url || "");
      setTags(project.tags || []);
      setImages(project.images || [{ url: "", title: "", description: "" }]);
    }
  }, [project]);

  const handleImageChange = (idx, field, value) => {
    const updated = [...images];
    updated[idx][field] = value;
    setImages(updated);
  };

  const addImageField = () =>
    setImages([...images, { url: "", title: "", description: "" }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      ...project,
      title,
      description,
      linkLabel,
      linkUrl,
      tags,
      images,
    };
    onSave(newProject);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-stone-900 rounded-lg shadow-lg w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4 text-white">
          {project ? "Editar Jogo" : "Novo Jogo"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 rounded"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 rounded"
            placeholder="Descrição"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            className="w-full p-2 rounded"
            placeholder="Texto do Link"
            value={linkLabel}
            onChange={(e) => setLinkLabel(e.target.value)}
          />
          <input
            className="w-full p-2 rounded"
            placeholder="URL do Link"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />

          {/* Tags */}
          <label className="block text-sm text-white">Tags</label>
          <select
            multiple
            className="w-full p-2 rounded"
            value={tags}
            onChange={(e) =>
              setTags(Array.from(e.target.selectedOptions, (opt) => opt.value))
            }
          >
            {availableTags.map((tag) => (
              <option key={tag.id} value={tag.title}>
                {tag.title}
              </option>
            ))}
          </select>

          {/* Imagens */}
          <label className="block text-sm text-white">Imagens</label>
          {images.map((img, i) => (
            <div key={i} className="space-y-2 mb-2 border p-2 rounded">
              <input
                className="w-full p-2 rounded"
                placeholder="URL da imagem"
                value={img.url}
                onChange={(e) => handleImageChange(i, "url", e.target.value)}
              />
              <input
                className="w-full p-2 rounded"
                placeholder="Título da imagem"
                value={img.title}
                onChange={(e) => handleImageChange(i, "title", e.target.value)}
              />
              <textarea
                className="w-full p-2 rounded"
                placeholder="Descrição"
                rows={2}
                value={img.description}
                onChange={(e) =>
                  handleImageChange(i, "description", e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="text-sm text-blue-400"
          >
            + Adicionar Imagem
          </button>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-stone-700 text-white rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-stone-600 text-white rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;

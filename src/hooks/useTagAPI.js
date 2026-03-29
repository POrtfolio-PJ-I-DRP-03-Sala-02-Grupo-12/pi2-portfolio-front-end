import { useState, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const normalizeTag = (tag) => ({
  id: tag.id,
  title: tag.title,
  games: (tag.games || []).map((g) => ({
    id: g.id,
    title: g.title,
    description: g.description,
    linkName: g.linkName || g.link_name,
    linkUrl: g.linkUrl || g.link_url,
    images: g.images || [],
  })),
});

export const useTagAPI = () => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/tags`);
      const data = await res.json();
      setTags(data.map(normalizeTag));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/tags/${id}`);
      setTag(normalizeTag(await res.json()));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (newTag) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTag),
      });

      const data = normalizeTag(await res.json());
      setTags((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id, updatedTag) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/tags/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTag),
      });

      const data = normalizeTag(await res.json());

      setTags((prev) => prev.map((t) => (t.id === id ? data : t)));

      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(`${API_BASE_URL}/api/projects/tags/${id}`, {
        method: "DELETE",
      });

      setTags((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tags,
    tag,
    loading,
    error,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  };
};

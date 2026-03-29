import { useState, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function useGameImagesAPI() {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const normalizeImage = (data) => {
    if (!data) return null;

    let gameParsed = null;

    try {
      gameParsed =
        typeof data.game === "string" ? JSON.parse(data.game) : data.game;

      if (gameParsed) {
        gameParsed.tags = (gameParsed.tags || []).filter(Boolean);
      }
    } catch {}

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      url: data.url,
      game: gameParsed,
    };
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/images`);
      const data = await res.json();
      const normalized = data.map(normalizeImage);
      setImages(normalized);
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
      const res = await fetch(`${API_BASE_URL}/api/projects/images/${id}`);
      const data = normalizeImage(await res.json());
      setImage(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (newImage) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newImage),
      });

      const data = normalizeImage(await res.json());
      setImages((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id, updatedImage) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/images/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedImage),
      });

      const data = normalizeImage(await res.json());

      setImages((prev) => prev.map((img) => (img.id === id ? data : img)));

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
      await fetch(`${API_BASE_URL}/api/projects/images/${id}`, {
        method: "DELETE",
      });

      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    images,
    image,
    loading,
    error,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  };
}

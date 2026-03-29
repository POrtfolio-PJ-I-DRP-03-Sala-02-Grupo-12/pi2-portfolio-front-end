import { useState, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const normalizeGameTag = (gt) => ({
  gameId: gt.game_id ?? gt.gameId,
  tagId: gt.tag_id ?? gt.tagId,
});

export const useGameTagAPI = () => {
  const [gameTags, setGameTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/games/tags`);
      const data = await res.json();
      setGameTags(data.map(normalizeGameTag));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (gameTag) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/games/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameTag),
      });

      const data = normalizeGameTag(await res.json());
      setGameTags((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (gameId, tagId) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(
        `${API_BASE_URL}/api/projects/games/tags/${gameId}/${tagId}`,
        { method: "DELETE" },
      );

      setGameTags((prev) =>
        prev.filter((gt) => !(gt.gameId === gameId && gt.tagId === tagId)),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { gameTags, loading, error, fetchAll, create, remove };
};

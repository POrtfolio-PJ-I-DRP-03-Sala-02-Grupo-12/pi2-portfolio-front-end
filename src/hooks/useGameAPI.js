import { useState, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// normalizer
const normalizeGame = (game) => ({
  ...game,
  linkName: game.linkName || game.link_name,
  linkUrl: game.linkUrl || game.link_url,
});

export const useGameAPI = () => {
  const [games, setGames] = useState([]);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`);
      const data = await res.json();
      const normalized = data.map(normalizeGame);
      setGames(normalized);
      return normalized;
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
      const res = await fetch(`${API_BASE_URL}/api/projects/${id}`);
      const data = await res.json();
      const normalized = normalizeGame(data);
      setGame(normalized);
      return normalized;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (newGame) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGame),
      });

      const data = normalizeGame(await res.json());
      setGames((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id, updatedGame) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedGame),
      });

      const data = normalizeGame(await res.json());

      setGames((prev) => prev.map((g) => (g.id === id ? data : g)));

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
      await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
      });

      setGames((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    games,
    game,
    loading,
    error,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  };
};

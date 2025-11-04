// useGamesAPI.js
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useGamesAPI() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/games`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch games");
        return res.json();
      })
      .then(setGames)
      .catch((err) => {
        console.error("[useGamesAPI] Error loading games:", err);
        setGames([]);
      });
  }, []);

  const addGame = async (data) => {
    const res = await fetch(`${API_BASE_URL}/api/games`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const newGame = await res.json();
    setGames((prev) => [...prev, newGame]);
  };

  const updateGame = async (data) => {
    const res = await fetch(`${API_BASE_URL}/api/games/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updated = await res.json();
    setGames((prev) => prev.map((g) => (g.id === data.id ? updated : g)));
  };

  const deleteGame = async (id) => {
    await fetch(`${API_BASE_URL}/api/games/${id}`, {
      method: "DELETE",
    });
    setGames((prev) => prev.filter((g) => g.id !== id));
  };

  return [games, { addGame, updateGame, deleteGame }];
}

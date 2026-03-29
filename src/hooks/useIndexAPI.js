import { useGameAPI } from "./useGameAPI";
import useGameImagesAPI from "./useGameImagesAPI";
import { useTagAPI } from "./useTagAPI";
import { useGameTagAPI } from "./useGameTagAPI";

const useIndexAPI = () => {
  const games = useGameAPI();
  const images = useGameImagesAPI();
  const tags = useTagAPI();
  const gameTags = useGameTagAPI();

  return Object.freeze({
    games,
    images,
    tags,
    gameTags,
  });
};

export default useIndexAPI;

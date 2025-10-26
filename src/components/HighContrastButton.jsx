import { useTheme } from "../context/ThemeContext";

function HighContrastButton() {
  const { isHighContrast, setIsHighContrast } = useTheme();

  return (
    <button
      onClick={() => setIsHighContrast(!isHighContrast)}
      className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-all
        ${
          isHighContrast
            ? "bg-white text-black hover:bg-gray-200"
            : "bg-gabisou-red text-white hover:bg-gabisou-dark-red"
        }`}
    >
      {isHighContrast ? "Modo normal" : "Alto contraste"}
    </button>
  );
}

export default HighContrastButton;

import { useEffect, useState } from "react";

export default function HighContrastButton() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    // Verifica a preferência salva
    const savedMode = localStorage.getItem("highContrast") === "true";
    setIsHighContrast(savedMode);

    if (savedMode) {
      document.documentElement.classList.add("high-contrast");
    }
  }, []);

  const toggleContrast = () => {
    const newMode = !isHighContrast;
    setIsHighContrast(newMode);

    // Alterna a classe no <html> (ou <body>)
    document.documentElement.classList.toggle("high-contrast", newMode);

    // Salva preferência
    localStorage.setItem("highContrast", newMode);
  };

  return (
    <button
      onClick={toggleContrast}
      aria-pressed={isHighContrast}
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        ${
          isHighContrast
            ? "bg-yellow-300 text-black focus:ring-yellow-400"
            : "bg-gray-900 text-white focus:ring-gray-600"
        }`}
    >
      {isHighContrast ? "Modo padrão" : "Alto contraste"}
    </button>
  );
}

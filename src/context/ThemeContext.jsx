import { createContext, useContext, useEffect, useState } from "react";

// Criamos o contexto
const ThemeContext = createContext();

// Hook personalizado para usar o contexto
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isHighContrast, setIsHighContrast] = useState(
    localStorage.getItem("highContrast") === "true"
  );

  useEffect(() => {
    if (isHighContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
    localStorage.setItem("highContrast", isHighContrast);
  }, [isHighContrast]);

  return (
    <ThemeContext.Provider value={{ isHighContrast, setIsHighContrast }}>
      {children}
    </ThemeContext.Provider>
  );
};

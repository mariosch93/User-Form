import { useState, useEffect } from "react";

function useDarkMode() {
  const [darkMode, setDarkMode] = useState(1);

  const handleMode = () => {
    setDarkMode((prevMode) => (prevMode === 0 ? 1 : 0));
  };

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "#2a2a2a";
      document.body.style.color = "#f2f2f2";
    } else {
      document.body.style.backgroundColor = "#f2f3f4";
      document.body.style.color = "#2a2a2a";
    }
  }, [darkMode]);

  return { darkMode, handleMode };
}

export default useDarkMode;

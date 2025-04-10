import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-xl"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-gray-900" />
      )}
    </button>
  );
};

export default ThemeToggle;

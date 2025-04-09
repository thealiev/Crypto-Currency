// import { useEffect, useState } from "react";
// import { FaSun, FaMoon } from "react-icons/fa";

// const ThemeToggle = () => {
//   const [isDark, setIsDark] = useState(() => {
//     return localStorage.getItem("theme") === "dark";
//   });

//   useEffect(() => {
//     const root = document.documentElement;
//     if (isDark) {
//       root.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       root.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [isDark]);

//   return (
//     <button
//       onClick={() => setIsDark(!isDark)}
//       className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-xl"
//       aria-label="Toggle Theme"
//     >
//       {isDark ? (
//         <FaSun className="text-yellow-400" />
//       ) : (
//         <FaMoon className="text-gray-900" />
//       )}
//     </button>
//   );
// };

// export default ThemeToggle;

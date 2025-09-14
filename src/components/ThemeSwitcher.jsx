import React, { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // In Claude.ai, we'll just use state instead of localStorage
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative flex items-center space-x-2 px-3 py-1.5 
        font-mono text-sm font-medium transition-all duration-200
        border border-gray-600/50 rounded-sm
        ${
          theme === "dark"
            ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        }
        ${isHovered ? "border-blue-400/70 shadow-sm" : ""}
        focus:outline-none focus:ring-1 focus:ring-blue-400/50
      `}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {/* Theme icon */}
      <svg
        className={`w-4 h-4 transition-transform duration-300 ${
          isHovered ? "rotate-12" : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {theme === "light" ? (
          // Sun icon for light theme
          <g>
            <circle cx="12" cy="12" r="5" strokeWidth={1.5} />
            <path
              d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              strokeWidth={1.5}
            />
          </g>
        ) : (
          // Moon icon for dark theme
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            strokeWidth={1.5}
          />
        )}
      </svg>

      {/* Theme text */}
      <span className="select-none">
        {theme === "light" ? "Light" : "Dark"}
      </span>

      {/* Status indicator dot */}
      <div
        className={`
        w-1.5 h-1.5 rounded-full transition-all duration-200
        ${theme === "dark" ? "bg-blue-400" : "bg-orange-400"}
        ${isHovered ? "animate-pulse" : ""}
      `}
      />
    </button>
  );
};

export default ThemeSwitcher;

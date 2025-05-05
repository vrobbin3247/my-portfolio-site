import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { path: "/", label: "_hello", exact: true },
    { path: "/about_me", label: "_about_me" },
    { path: "/skills", label: "_skills" },
    { path: "/projects", label: "_projects" },
  ];

  return (
    <div className="sticky top-0 space-y-0.5 w-full">
      {/* Top bar with circles and title */}
      <nav className="bg-custom_purple_washed flex h-10 items-center space-x-4 w-full z-20">
        {/* Circles */}
        <div className="flex items-center space-x-3 px-2">
          <div className="w-3 h-3 rounded-full bg-custom-red"></div>
          <div className="w-3 h-3 rounded-full bg-custom-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-custom-green"></div>
        </div>
        <span className="font-cascadia text-custom-gray text-sm font-semibold">
          Vaibhav_Mandavkar
        </span>
      </nav>

      <nav className="flex flex-row space-x-0.5 font-cascadia text-sm font-bold w-full">
        {/* Dynamic nav items */}
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `h-8 flex items-center justify-center w-52 bg-custom_purple_washed ${
                isActive
                  ? "text-custom-yellow"
                  : "text-white hover:text-custom-yellow"
              }`
            }
            end={item.exact}
          >
            {item.label}
          </NavLink>
        ))}
        
        {/* Responsive spacer that fills remaining width */}
        <div className="h-8 bg-custom_purple_washed flex-grow"></div>
      </nav>
    </div>
  );
};

export default Navbar;
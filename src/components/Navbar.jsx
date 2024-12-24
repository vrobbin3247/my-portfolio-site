import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 space-y-0.5">
      {/* Top bar with circles and title */}
      <nav className="bg-custom_purple_washed flex h-10 items-center space-x-4 w-full z-20  start-0  ">
        {/* Circles */}
        <div className="flex items-center space-x-3 px-2">
          <div className="w-3 h-3 rounded-full bg-custom-red"></div>
          <div className="w-3 h-3 rounded-full bg-custom-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-custom-green"></div>
        </div>
        <span className=" font-cascadia text-custom-gray text-sm font-semibold">
          Vaibhav_Mandavkar
        </span>
      </nav>

      <nav className="flex flex-row space-x-0.5 font-cascadia text-sm font-bold">
        {/* _hello */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `h-8 content-center px-20 flex-none bg-custom_purple_washed ${
              isActive
                ? "text-custom-yellow"
                : "text-white hover:text-custom-yellow"
            }`
          }
          end
        >
          _hello
        </NavLink>

        {/* _about_me */}
        <NavLink
          to="/about_me"
          className={({ isActive }) =>
            `h-8 content-center px-20 flex-none bg-custom_purple_washed ${
              isActive
                ? "text-custom-yellow"
                : "text-white hover:text-custom-yellow"
            }`
          }
        >
          _about_me
        </NavLink>

        {/* _skills */}
        <NavLink
          to="/skills"
          className={({ isActive }) =>
            `h-8 content-center px-20 flex-none bg-custom_purple_washed ${
              isActive
                ? "text-custom-yellow"
                : "text-white hover:text-custom-yellow"
            }`
          }
        >
          _skills
        </NavLink>

        {/* _projects */}
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `h-8 content-center px-20 flex-none bg-custom_purple_washed ${
              isActive
                ? "text-custom-yellow"
                : "text-white hover:text-custom-yellow"
            }`
          }
        >
          _projects
        </NavLink>

        {/* Spacer */}
        <div className="h-8 bg-custom_purple_washed text-custom_purple_washed px-[50rem]"></div>
      </nav>
    </div>
  );
};

export default Navbar;

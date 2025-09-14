import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import git from "/public/static/images/git.png";
import instagram from "/public/static/images/instagram.png";
import linkedin from "/public/static/images/linkedin.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "_hello", exact: true },
    { path: "/about_me", label: "_about_me" },
    { path: "/skills", label: "_skills" },
    { path: "/projects", label: "_projects" },
  ];

  const socialLinks = [
    {
      href: "https://github.com/vrobbin3247",
      img: git,
      alt: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/vaibhav-mandavkar-691701172/",
      img: linkedin,
      alt: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/me_vaibhavm/",
      img: instagram,
      alt: "Instagram",
    },
  ];

  return (
    <>
      {/* Desktop Navbar - Original */}
      <div className="hidden md:block sticky top-0 space-y-0.5 w-full">
        {/* Top bar with circles and title */}
        <nav className="bg-custom-purple-washed flex h-10 items-center justify-between px-4 space-x-4 w-full z-20">
          <div className="flex items-center space-x-4">
            {/* Circles */}
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-custom-red"></div>
              <div className="w-3 h-3 rounded-full bg-custom-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-custom-green"></div>
            </div>
            <span className="font-cascadia text-custom-gray text-sm font-semibold">
              Vaibhav_Mandavkar
            </span>
          </div>
          <ThemeSwitcher />
        </nav>

        <nav className="flex flex-row space-x-0.5 font-cascadia text-sm font-bold w-full">
          {/* Dynamic nav items */}
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `h-8 flex items-center justify-center w-52 bg-custom-purple-washed ${
                  isActive
                    ? "text-custom-yellow"
                    : "text-custom-text hover:text-custom-yellow"
                }`
              }
              end={item.exact}
            >
              {item.label}
            </NavLink>
          ))}

          {/* Responsive spacer that fills remaining width */}
          <div className="h-8 bg-custom-purple-washed flex-grow"></div>
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <nav className="bg-custom-purple-washed flex h-12 items-center justify-between px-4 w-full z-20">
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6 text-custom-text" />
              ) : (
                <FaBars className="h-6 w-6 text-custom-text" />
              )}
            </button>

            <span className="font-cascadia text-custom-gray text-xs font-semibold">
              Vaibhav_Mandavkar
            </span>
          </div>
          <ThemeSwitcher />
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-custom-background bg-opacity-50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="absolute top-0 left-0 w-64 bg-custom-purple-washed shadow-lg min-h-screen"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Header */}
              <div className="bg-custom-purple-washed flex h-16 items-center justify-start px-4 border-b border-custom-purple">
                <span className="font-cascadia text-custom-gray text-sm font-semibold">
                  Vaibhav_Mandavkar
                </span>
              </div>

              <nav className="flex flex-col font-cascadia text-sm font-bold flex-grow">
                {navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) =>
                      `h-12 flex items-center px-4 bg-custom-purple-washed border-b border-custom-purple ${
                        isActive
                          ? "text-custom-yellow"
                          : "text-custom-text hover:text-custom-yellow"
                      }`
                    }
                    end={item.exact}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              {/* Social Links and Resume */}
              <div className="p-4 bg-custom-purple-washed border-t border-custom-purple">
                {/* Social Icons */}
                <div className="flex justify-center space-x-6 mb-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.alt}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-custom-text hover:text-custom-yellow"
                    >
                      <img src={link.img} alt={link.alt} className="h-6 w-6" />
                    </a>
                  ))}
                </div>

                {/* Resume Download Button */}
                <a
                  href="/vaibhav resume.pdf"
                  download="Vaibhav_Mandavkar_Resume.pdf"
                  className="block w-full text-center bg-custom-purple text-custom-text font-cascadia text-xs py-3 px-4 rounded hover:bg-opacity-80 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  _download_resume
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

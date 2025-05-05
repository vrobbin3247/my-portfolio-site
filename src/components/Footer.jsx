import React from "react";
import git from "/public/static/images/git.png";
import instagram from "/public/static/images/instagram.png";
import linkedin from "/public/static/images/linkedin.png";

const Footer = () => {
  const socialLinks = [
    {
      href: "https://github.com/vrobbin3247",
      img: git,
      alt: "GitHub"
    },
    {
      href: "https://www.linkedin.com/in/vaibhav-mandavkar-691701172/",
      img: linkedin,
      alt: "LinkedIn"
    },
    {
      href: "https://www.instagram.com/me_vaibhavm/",
      img: instagram,
      alt: "Instagram"
    }
  ];

  return (
    <footer className="fixed bottom-0 flex flex-row w-full">
      <div className="h-10 flex items-center font-cascadia text-sm font-bold text-custom-gray hover:text-white bg-custom_purple_washed px-4">
        _get_in_touch
      </div>
      
      {/* Social links */}
      {socialLinks.map((link, index) => (
        <div key={index} className="h-10 flex items-center font-cascadia text-sm font-bold text-custom-gray hover:text-white bg-custom_purple_washed px-2">
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            <img src={link.img} alt={link.alt} className="h-6" />
          </a>
        </div>
      ))}
      
      {/* Responsive spacer */}
      <div className="h-10 bg-custom_purple_washed flex-grow"></div>
    </footer>
  );
};

export default Footer;
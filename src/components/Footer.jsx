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
    <footer className="fixed bottom-0 flex flex-row space-x-0.5 w-full">
      <div className="h-10 flex items-center justify-center w-40 font-cascadia text-sm font-bold text-custom-gray hover:text-white bg-custom_purple_washed">
        _get_in_touch
      </div>
      
      {/* Social links */}
      {socialLinks.map((link, index) => (
        <div key={index} className="h-10 flex items-center justify-center w-12 font-cascadia text-custom-gray hover:text-white bg-custom_purple_washed">
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            <img src={link.img} alt={link.alt} className="h-6" />
          </a>
        </div>
      ))}
      
      {/* Resume download */}
      <div className="h-10 flex items-center justify-center w-40 font-cascadia text-sm font-bold text-custom-gray hover:text-white bg-custom_purple_washed">
        <a href="/vaibhav resume.pdf" download="Vaibhav_Mandavkar_Resume.pdf" className="w-full h-full flex items-center justify-center">
          _download_resume
        </a>
      </div>
      
      {/* Responsive spacer */}
      <div className="h-10 bg-custom_purple_washed flex-grow"></div>
    </footer>
  );
};

export default Footer;
import React, { useState } from "react";
import git from "/public/static/images/git.png";
import instagram from "/public/static/images/instagram.png";
import linkedin from "/public/static/images/linkedin.png";

const Footer = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setShowContactForm(false);
  };

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
      {/* Desktop Footer - Original */}
      <footer className="hidden md:flex fixed bottom-0 flex-row space-x-0.5 w-full">
        <div
          className="h-10 flex items-center justify-center w-40 font-cascadia text-sm font-bold text-custom-gray hover:text-custom-text bg-custom-purple-washed cursor-pointer"
          onClick={() => setShowContactForm(true)}
        >
          _get_in_touch
        </div>

        {/* Social links */}
        {socialLinks.map((link, index) => (
          <div
            key={index}
            className="h-10 flex items-center justify-center w-12 font-cascadia text-custom-gray hover:text-custom-text bg-custom-purple-washed"
          >
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <img src={link.img} alt={link.alt} className="h-6" />
            </a>
          </div>
        ))}

        {/* Resume download */}
        <div className="h-10 flex items-center justify-center w-40 font-cascadia text-sm font-bold text-custom-gray hover:text-custom-text bg-custom-purple-washed">
          <a
            href="/vaibhav resume.pdf"
            download="Vaibhav_Mandavkar_Resume.pdf"
            className="w-full h-full flex items-center justify-center"
          >
            _download_resume
          </a>
        </div>

        {/* Responsive spacer */}
        <div className="h-10 bg-custom-purple-washed flex-grow"></div>
      </footer>

      {/* Mobile Footer */}
      <footer className="md:hidden fixed bottom-0 w-full">
        <div className="bg-custom-purple-washed border-t border-custom-purple">
          {/* Top row - Contact and Resume */}
          <div className="flex">
            <button
              className="flex-1 h-10 flex items-center justify-center font-cascadia text-xs font-bold text-custom-gray hover:text-custom-text border-r border-custom-purple"
              onClick={() => setShowContactForm(true)}
            >
              _get_in_touch
            </button>
            <div className="flex-1 h-10 flex items-center justify-center font-cascadia text-xs font-bold text-custom-gray hover:text-custom-text">
              <a
                href="/vaibhav resume.pdf"
                download="Vaibhav_Mandavkar_Resume.pdf"
                className="w-full h-full flex items-center justify-center"
              >
                _download_resume
              </a>
            </div>
          </div>

          {/* Bottom row - Social links */}
          <div className="flex border-t border-custom-purple">
            {socialLinks.map((link, index) => (
              <div
                key={index}
                className="flex-1 h-10 flex items-center justify-center font-cascadia text-custom-gray hover:text-custom-text border-r border-custom-purple last:border-r-0"
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <img src={link.img} alt={link.alt} className="h-5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* Contact Form Modal - Responsive */}
      {showContactForm && (
        <div className="fixed inset-0 bg-custom-background bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-custom-purple-washed p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-custom-gray hover:text-custom-text text-xl"
            >
              ✕
            </button>

            <h3 className="font-cascadia text-xl font-bold mb-4 text-custom-text">
              Contact Me
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-custom-gray mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full bg-custom_purple rounded border border-custom-purple-washed p-2 text-custom-text focus:outline-none focus:border-custom-purple"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-custom-gray mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  className="w-full bg-custom_purple rounded border border-custom-purple-washed p-2 text-custom-text focus:outline-none focus:border-custom-purple resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-custom-purple hover:bg-custom-purple-washed text-custom-text font-cascadia py-2 px-4 rounded transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;

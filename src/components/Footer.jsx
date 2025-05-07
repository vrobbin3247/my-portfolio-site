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
    <footer className="fixed bottom-0 flex flex-row space-x-0.5 w-full">
      <div
        className="h-10 flex items-center justify-center w-40 font-cascadia text-sm font-bold text-custom-gray hover:text-white bg-custom_purple_washed cursor-pointer"
        onClick={() => setShowContactForm(true)}
      >
        _get_in_touch
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-custom_purple_washed p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-custom-gray hover:text-white"
            >
              ✕
            </button>

            <h3 className="font-cascadia text-xl font-bold mb-4 text-white">
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
                  className="w-full bg-custom_purple rounded border border-custom_purple_washed p-2 text-white focus:outline-none focus:border-custom-purple"
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
                  className="w-full bg-custom_purple rounded border border-custom_purple_washed p-2 text-white focus:outline-none focus:border-custom-purple"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-custom-purple hover:bg-custom_purple_washed text-white font-cascadia py-2 px-4 rounded transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Social links */}
      {socialLinks.map((link, index) => (
        <div
          key={index}
          className="h-10 flex items-center justify-center w-12 font-cascadia text-custom-gray hover:text-white bg-custom_purple_washed"
        >
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            <img src={link.img} alt={link.alt} className="h-6" />
          </a>
        </div>
      ))}

      {/* Resume download */}
      <div className="h-10 flex items-center justify-center w-40 font-cascadia text-sm font-bold text-custom-gray hover:text-white bg-custom_purple_washed">
        <a
          href="/vaibhav resume.pdf"
          download="Vaibhav_Mandavkar_Resume.pdf"
          className="w-full h-full flex items-center justify-center"
        >
          _download_resume
        </a>
      </div>

      {/* Responsive spacer */}
      <div className="h-10 bg-custom_purple_washed flex-grow"></div>
    </footer>
  );
};

export default Footer;

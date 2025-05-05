import React from "react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Devanagari Character Classifier",
      description:
        "A Streamlit web app that recognizes handwritten Devanagari characters using a Convolutional Neural Network (CNN).",
      technologies: ["Python", "TensorFlow", "Streamlit"],
      githubLink: "https://github.com/vrobbin3247/devnagari-character-classifier",
      liveDemo: "https://devanagari-character-classifier.streamlit.app/",
      image: "devnagari-character-classifier.jpg", // Replace with your image path/URL
    },
    {
      id: 2,
      title: "Custom YOLO Model",
      description:
        "Trains a YOLOv8 model on a subset of the BDD100K dataset for object detection in autonomous driving scenarios.",
      technologies: ["Python", "YOLOv8", "Jupyter Notebook"],
      githubLink: "https://github.com/vrobbin3247/Custom-YOLO-model",
      liveDemo: "", // No live demo available
      image: "custom-yolo-model.jpg", // Replace with your image path/URL
    },
    {
      id: 3,
      title: "India CPI Analysis",
      description:
        "A Streamlit web application to analyze and forecast the Consumer Price Index (CPI) across various Indian states and groups using LSTM models.",
      technologies: ["Python", "Streamlit", "LSTM", "Pandas"],
      githubLink: "https://github.com/vrobbin3247/india-CPI-analysis",
      liveDemo: "https://india-cpi-analysis-2013-25.streamlit.app/",
      image: "india-cpi-analysis.jpg", // Replace with your image path/URL
    },
    {
      id: 4,
      title: "Portfolio Site",
      description:
        "Personal portfolio website showcasing projects and skills with a responsive design and modern UI/UX.",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubLink: "https://github.com/vrobbin3247/portfolio-site",
      liveDemo: "", // Add live demo link if available
      image: "portfolio-site.jpg", // Replace with your image path/URL
    },
    {
      id: 5,
      title: "Spotify Playlist Organiser",
      description:
        "A Vite + React + TypeScript project that allows users to organize their Spotify playlists by creating multiple sub-playlists and categorizing tracks with a drag-and-drop feature.",
      technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Spotify API"],
      githubLink: "https://github.com/vrobbin3247/spotify-playlist-organiser",
      liveDemo: "https://spotify-playlist-organiser.vercel.app/",
      image: "spotify-playlist-organiser.jpg", // Replace with your image path/URL
    },
    // Add more projects as needed
  ];

  
  return (
    <div className="min-h-screen py-12 ">
      <div className="px-9 mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
           <div
           key={project.id}
           className="rounded-lg bg-custom_purple_washed text-white font-cascadia shadow-md overflow-hidden hover:shadow-xl  transition-all duration-300"
         >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
              <h3 className="text-xl font-bold text-white transition-colors duration-300 mb-2">                  {project.title}
                </h3>
                <p className="text-white mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                   <span
                   key={index}
                   className="px-3 py-1 bg-custom_purple_washed text-white text-sm font-cascadia rounded-full transition-colors duration-200"
                 >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
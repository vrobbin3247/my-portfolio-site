import React, { useState, useEffect } from "react";
import { FaPython, FaReact } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import MarkdownRenderer from "../components/MarkdownRenderer";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({
    "ai-ml": true,
    "web-dev": true,
    "data-analysis": true,
  });

  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const projectCategories = {
    "ai-ml": [
      {
        id: 1,
        title: "Devanagari Character Classifier",
        technologies: ["Python", "TensorFlow", "Streamlit"],
        live: "https://devanagari-character-classifier.streamlit.app/",
        git_repo:
          "https://github.com/vrobbin3247/devnagari-character-classifier",
      },
      {
        id: 2,
        title: "Custom YOLO Model",
        technologies: ["Python", "YOLOv8", "Jupyter Notebook"],
        live: "",
        git_repo: "https://github.com/vrobbin3247/Custom-YOLO-model",
      },
    ],
    "data-analysis": [
      {
        id: 3,
        title: "India CPI Analysis",
        technologies: ["Python", "Streamlit", "LSTM", "Pandas"],
        live: "https://india-cpi-analysis-2013-25.streamlit.app/",
        git_repo: "https://github.com/vrobbin3247/india-CPI-analysis",
      },
    ],
    "web-dev": [
      {
        id: 4,
        title: "Portfolio Site",
        technologies: ["React", "Tailwind", "Vite", "vercel"],
        live: "https://uvaan.co.in",
        git_repo: "https://github.com/vrobbin3247/my-portfolio-site",
      },
      {
        id: 5,
        title: "Spotify Playlist Organiser",
        technologies: [
          "React",
          "TypeScript",
          "Vite",
          "Tailwind CSS",
          "Spotify API",
        ],
        live: "",
        git_repo: "https://github.com/vrobbin3247/spotify-playlist-organiser",
      },
      {
        id: 6,
        title: "Spotify Poster Maker",
        technologies: ["Python"],
        live: "https://spotify-poster-maker.streamlit.app/",
        git_repo: "https://github.com/vrobbin3247/Spotify-Poster-Maker",
      },
    ],
  };

  const folderTypes = {
    "ai-ml": { icon: "🧠", name: "AI & Machine Learning" },
    "web-dev": { icon: "🌐", name: "Web Development" },
    "data-analysis": { icon: "📊", name: "Data Analysis" },
  };

  const toggleFolder = (folderName) => {
    setExpandedFolders({
      ...expandedFolders,
      [folderName]: !expandedFolders[folderName],
    });
  };

  // Helper: convert title to file name
  const getMarkdownFileName = (title) => {
    return title + ".md";
  };

  // Fetch markdown when selectedProject changes
  useEffect(() => {
    if (!selectedProject) {
      setMarkdownContent("");
      return;
    }

    const project = Object.values(projectCategories)
      .flat()
      .find((p) => p.id === selectedProject);

    if (!project) {
      setMarkdownContent("");
      return;
    }

    const fileName = getMarkdownFileName(project.title);
    const filePath = `/content/${fileName}`;

    setLoading(true);
    setError(null);

    fetch(filePath)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load markdown file.");
        }
        return res.text();
      })
      .then((text) => {
        setMarkdownContent(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [selectedProject]);

  return (
    <div className="min-h-screen py-6 bg-custom-background font-cascadia">
      <div className="px-4 sm:px-4 lg:px-4 mx-auto">
        <div className="mb-8">
          <div className="flex h-[80vh]">
            {/* Left Navigation */}
            <div className="w-1/3 border-r border-custom_purple_washed pr-2 overflow-y-auto">
              {Object.keys(projectCategories).map((folderName) => (
                <div key={folderName} className="mb-2">
                  <div
                    className="text-custom-gray pl-4 py-2 text-sm flex items-center cursor-pointer hover:bg-custom_purple_washed"
                    onClick={() => toggleFolder(folderName)}
                  >
                    <span className="transform inline-block mr-2">
                      {expandedFolders[folderName] ? "▼" : "►"}
                    </span>
                    <span className="mr-2">{folderTypes[folderName].icon}</span>
                    <span>{folderTypes[folderName].name}</span>
                  </div>

                  {expandedFolders[folderName] && (
                    <div>
                      {projectCategories[folderName].map((project) => (
                        <div
                          key={project.id}
                          className={`pl-8 py-2 cursor-pointer text-sm flex items-center ${
                            selectedProject === project.id
                              ? "bg-custom_purple_washed text-white"
                              : "text-custom-gray hover:text-white hover:bg-custom_purple_washed/50"
                          }`}
                          onClick={() => setSelectedProject(project.id)}
                        >
                          <span className="mr-2">
                            {project.technologies[0] === "Python" && (
                              <FaPython className="text-yellow-400" />
                            )}
                            {project.technologies[0] === "React" && (
                              <FaReact className="text-cyan-500" />
                            )}
                          </span>
                          <div className="flex items-center gap-4 text-white">
                            <span className="font-bold">{project.title}</span>

                            {project.live ? (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-custom-blue hover:underline"
                              >
                                Try
                              </a>
                            ) : (
                              <span className="text-gray-500 cursor-not-allowed">
                                Try
                              </span>
                            )}

                            <a
                              href={project.git_repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-custom-green hover:underline"
                            >
                              Code
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Content Area */}
            <div className="w-2/3 pl-4 overflow-y-auto text-white">
              {selectedProject ? (
                <div>
                  {(() => {
                    const project = Object.values(projectCategories)
                      .flat()
                      .find((p) => p.id === selectedProject);

                    if (!project) return null;

                    return (
                      <div className="mb-6">
                        <div className="sticky top-0 bg-custom-background pt-2 pb-4 z-10">
                          {/* <h3 className="text-custom-purple text-xl font-bold mb-4">
                            {project.title}
                          </h3> */}
                          {loading ? (
                            <p>Loading markdown...</p>
                          ) : error ? (
                            <p className="text-red-500">Error: {error}</p>
                          ) : (
                            <div className="all-unset">
                              <div className="prose prose-invert max-w-none">
                                <MarkdownRenderer content={markdownContent} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-custom-gray">
                  <div className="text-center">
                    <p className="text-xl mb-2">
                      // Select a project from the explorer
                    </p>
                    <p>
                      console.log("Click on a project file to view details")
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

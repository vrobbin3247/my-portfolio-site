import React, { useState } from "react";
import { FaPython, FaReact } from "react-icons/fa";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({
    "ai-ml": true,
    "web-dev": true,
    "data-analysis": true,
  });

  const projectCategories = {
    "ai-ml": [
      {
        id: 1,
        title: "Devanagari Character Classifier",
        description:
          "A Streamlit web app that recognizes handwritten Devanagari characters using a Convolutional Neural Network (CNN).",
        technologies: ["Python", "TensorFlow", "Streamlit"],
        githubLink:
          "https://github.com/vrobbin3247/devnagari-character-classifier",
        liveDemo: "https://devanagari-character-classifier.streamlit.app/",
        image: "devnagari-character-classifier.jpg",
        codeSnippet: `
# Train the CNN model
model = Sequential([
    Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(32, 32, 1)),
    MaxPooling2D(pool_size=(2, 2)),
    Conv2D(64, kernel_size=(3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.3),
    Dense(46, activation='softmax')
])
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
`,
      },
      {
        id: 2,
        title: "Custom YOLO Model",
        description:
          "Trains a YOLOv8 model on a subset of the BDD100K dataset for object detection in autonomous driving scenarios.",
        technologies: ["Python", "YOLOv8", "Jupyter Notebook"],
        githubLink: "https://github.com/vrobbin3247/Custom-YOLO-model",
        liveDemo: "",
        image: "custom-yolo-model.jpg",
        codeSnippet: `
# Initialize and train YOLOv8 model
from ultralytics import YOLO

# Load a model
model = YOLO('yolov8n.yaml')  # build a new model from YAML
model = YOLO('yolov8n.pt')    # load a pretrained model

# Train the model
results = model.train(
   data='bdd100k.yaml',
   epochs=100,
   imgsz=640,
   batch=16
)
`,
      },
    ],
    "data-analysis": [
      {
        id: 3,
        title: "India CPI Analysis",
        description:
          "A Streamlit web application to analyze and forecast the Consumer Price Index (CPI) across various Indian states and groups using LSTM models.",
        technologies: ["Python", "Streamlit", "LSTM", "Pandas"],
        githubLink: "https://github.com/vrobbin3247/india-CPI-analysis",
        liveDemo: "https://india-cpi-analysis-2013-25.streamlit.app/",
        image: "india-cpi-analysis.jpg",
        codeSnippet: `
# Create and train LSTM model
def create_lstm_model(X_train, y_train, X_test, y_test):
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])))
    model.add(LSTM(50, return_sequences=False))
    model.add(Dense(25))
    model.add(Dense(1))
    
    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(X_train, y_train, batch_size=32, epochs=100, validation_data=(X_test, y_test))
    return model
`,
      },
    ],
    "web-dev": [
      {
        id: 4,
        title: "Portfolio Site",
        description:
          "Personal portfolio website showcasing projects and skills with a responsive design and modern UI/UX.",
        technologies: ["React", "Tailwind", "Vite", "vercel"],
        githubLink: "https://github.com/vrobbin3247/portfolio-site",
        liveDemo: "https://www.uvaan.co.in",
        image: "portfolio-site.jpg",
        codeSnippet: `
// Terminal typing effect
const terminalText = document.querySelector('.terminal-text');
const text = 'Hello, my name is vaibhav() { ... }';
let index = 0;

function typeWriter() {
  if (index < text.length) {
    terminalText.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, Math.random() * 100 + 50);
  } else {
    setTimeout(() => {
      terminalText.innerHTML = '';
      index = 0;
      typeWriter();
    }, 3000);
  }
}

typeWriter();
`,
      },
      {
        id: 5,
        title: "Spotify Playlist Organiser",
        description:
          "A Vite + React + TypeScript project that allows users to organize their Spotify playlists by creating multiple sub-playlists and categorizing tracks with a drag-and-drop feature.",
        technologies: [
          "React",
          "TypeScript",
          "Vite",
          "Tailwind CSS",
          "Spotify API",
        ],
        githubLink: "https://github.com/vrobbin3247/spotify-playlist-organiser",
        liveDemo: "https://spotify-playlist-organiser.vercel.app/",
        image: "spotify-playlist-organiser.jpg",
        codeSnippet: `
// Handle drag and drop functionality
const handleDragEnd = (result) => {
  if (!result.destination) return;
  
  const { source, destination } = result;
  
  if (source.droppableId !== destination.droppableId) {
    const sourcePlaylist = playlists.find(p => p.id === source.droppableId);
    const destPlaylist = playlists.find(p => p.id === destination.droppableId);
    
    const sourceItems = [...sourcePlaylist.tracks];
    const destItems = [...destPlaylist.tracks];
    const [removed] = sourceItems.splice(source.index, 1);
    
    destItems.splice(destination.index, 0, removed);
    
    setPlaylists(playlists.map(p => {
      if (p.id === source.droppableId) {
        return { ...p, tracks: sourceItems };
      }
      if (p.id === destination.droppableId) {
        return { ...p, tracks: destItems };
      }
      return p;
    }));
  }
};
`,
      },
    ],
  };

  // Get all projects in a flat array
  const getAllProjects = () => {
    return Object.values(projectCategories).flat();
  };

  const toggleFolder = (folderName) => {
    setExpandedFolders({
      ...expandedFolders,
      [folderName]: !expandedFolders[folderName],
    });
  };

  const LineNumbers = ({ count }) => {
    return (
      <div className="flex flex-col items-end pr-4 text-custom-gray text-sm font-cascadia">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="h-6">
            {i + 1}
          </div>
        ))}
      </div>
    );
  };

  // Count lines in code snippet for line numbers
  const countLines = (text) => {
    return text ? text.split("\n").length : 10;
  };

  // Folder type icons and names
  const folderTypes = {
    "ai-ml": { icon: "🧠", name: "AI & Machine Learning" },
    "web-dev": { icon: "🌐", name: "Web Development" },
    "data-analysis": { icon: "📊", name: "Data Analysis" },
  };

  return (
    <div className="min-h-screen py-6 bg-custom-background font-cascadia">
      <div className="px-4 sm:px-4 lg:px-4 mx-auto">
        <div className="mb-8">
          {/* Project Browser Section - Fixed Heights for Scrolling */}
          <div className="flex h-[80vh]">
            {/* Project List - Left Side - Static */}
            <div className="w-1/3 border-r border-custom_purple_washed pr-2 overflow-y-auto">
              {/* <div className="text-custom-gray mb-2 pl-4 py-2 text-sm flex items-center sticky top-0 bg-custom-background z-10">
                <span className="transform rotate-90 inline-block mr-2">▶</span>
                <span>EXPLORER</span>
              </div> */}

              {/* Folders and Projects */}
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
                            {(() => {
                              const techIcons = {
                                Python: (
                                  <FaPython className="text-yellow-400" />
                                ),
                                React: <FaReact className="text-cyan-500" />,
                              };

                              const mainTech = project.technologies[0];
                              return techIcons[mainTech] || null;
                            })()}
                          </span>
                          <span>
                            {project.title}
                            {(() => {
                              const techExtensions = {
                                Python: ".py",
                                React: ".jsx",
                                TypeScript: ".ts",
                                JavaScript: ".js",
                                HTML: ".html",
                                CSS: ".css",
                                TensorFlow: ".py",
                                Streamlit: ".py",
                                YOLOv8: ".ipynb",
                                LSTM: ".py",
                                Pandas: ".py",
                                "Tailwind CSS": ".css",
                                Vite: ".js",
                                "Spotify API": ".ts",
                              };

                              const mainTech = project.technologies[0];
                              return techExtensions[mainTech] || ".js";
                            })()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Project Details - Right Side - Scrollable */}
            <div className="w-2/3 pl-4 overflow-y-auto">
              {selectedProject ? (
                <div className="text-white">
                  {(() => {
                    const project = getAllProjects().find(
                      (p) => p.id === selectedProject
                    );
                    return (
                      <>
                        <div className="mb-6">
                          <div className="sticky top-0 bg-custom-background pt-2 pb-4 z-10">
                            <h3 className="text-custom-purple text-xl font-bold">
                              const {project.title.replace(/\s+/g, "")} = ()
                              =&gt; {"{"}
                            </h3>
                          </div>

                          <div className="ml-4 mb-4">
                            <p className="text-custom-green mb-2">
                              // {project.description}
                            </p>

                            <div className="mb-4">
                              <span className="text-custom-blue">const</span>{" "}
                              <span className="text-custom-yellow">
                                technologies
                              </span>{" "}
                              = [
                              <span className="text-custom-red">
                                {project.technologies.map((tech, i) => (
                                  <span key={i}>
                                    "{tech}"
                                    {i < project.technologies.length - 1
                                      ? ", "
                                      : ""}
                                  </span>
                                ))}
                              </span>
                              ];
                            </div>

                            <div className="mb-4">
                              <div>
                                <span className="text-custom-blue">const</span>{" "}
                                <span className="text-custom-yellow">
                                  links
                                </span>{" "}
                                = {"{"}
                              </div>
                              <div className="ml-4">
                                <span className="text-custom-yellow">
                                  github:
                                </span>{" "}
                                <span className="text-custom-red">
                                  "{project.githubLink}"
                                </span>
                                ,
                              </div>
                              {project.liveDemo && (
                                <div className="ml-4">
                                  <span className="text-custom-yellow">
                                    demo:
                                  </span>{" "}
                                  <span className="text-custom-red">
                                    "{project.liveDemo}"
                                  </span>
                                </div>
                              )}
                              <div>{"}"}</div>
                            </div>

                            <div className="mb-6">
                              <div className="flex gap-4">
                                <a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-custom_purple_washed hover:bg-custom-purple transition-colors duration-200 px-4 py-2 rounded text-white"
                                >
                                  View GitHub
                                </a>
                                {project.liveDemo && (
                                  <a
                                    href={project.liveDemo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-custom_purple_washed hover:bg-custom-blue transition-colors duration-200 px-4 py-2 rounded text-white"
                                  >
                                    Live Demo
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* Code Snippet Section */}
                            <div className="mb-4">
                              <p className="text-custom-green mb-2">
                                // Sample code from this project:
                              </p>
                              <div className="bg-custom_purple_washed rounded overflow-hidden">
                                <div className="flex">
                                  <LineNumbers
                                    count={countLines(project.codeSnippet)}
                                  />
                                  <pre className="overflow-x-auto p-4 text-sm">
                                    <code>{project.codeSnippet}</code>
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>{"};"}</div>

                          <div className="mt-4">
                            <span className="text-custom-blue">
                              export default
                            </span>{" "}
                            {project.title.replace(/\s+/g, "")};
                          </div>
                        </div>
                      </>
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
                      console.log("Click on a project file to view details");
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

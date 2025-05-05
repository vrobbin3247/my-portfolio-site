import React from "react";

const Skills = () => {
  // Technical skills with proficiency levels
  const technicalSkills = [
    { name: "JavaScript", proficiency: 90 },
    { name: "React", proficiency: 85 },
    { name: "Node.js", proficiency: 80 },
    { name: "Python", proficiency: 75 },
    { name: "Flutter", proficiency: 70 },
    { name: "CSS/Tailwind", proficiency: 85 },
  ];

  // AI/ML skills
  const aiSkills = [
    { name: "Machine Learning", proficiency: 70 },
    { name: "Deep Learning", proficiency: 65 },
    { name: "Data Analysis", proficiency: 80 },
    { name: "Computer Vision", proficiency: 60 },
  ];

  // Other skills
  const otherSkills = [
    { name: "Photography", proficiency: 75 },
    { name: "UI/UX Design", proficiency: 70 },
    { name: "Project Management", proficiency: 65 },
  ];

  // Function to render skill with progress bar
  const renderSkill = (skill, index, prefix) => {
    return (
      <div key={`${prefix}-${index}`} className="mb-2">
        <div className="flex items-center">
          <span className="text-custom-gray w-6">{index + 1}</span>
          <span className="text-custom-yellow mr-2">const</span>
          <span className="text-custom-blue">{skill.name}</span>
          <span className="text-white mx-2">=</span>
          <span className="text-custom-green">{skill.proficiency}%</span>
          <span className="text-white">;</span>
        </div>
        {/* Progress bar */}
        <div className="ml-6 mt-1 bg-custom_purple_washed h-1.5 w-full rounded-full overflow-hidden">
          <div
            className="bg-custom-purple h-full rounded-full"
            style={{ width: `${skill.proficiency}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-custom-background text-white p-6 font-cascadia w-full h-full overflow-auto">
      {/* Line numbers and code area */}
      <div className="flex flex-col">
        {/* Code comment header */}
        <div className="text-custom-gray mb-4">// Skills and competencies</div>

        {/* Class definition */}
        <div className="mb-4">
          <span className="text-custom-purple">class</span>
          <span className="text-custom-yellow ml-2">TechnicalSkills</span>
          <span className="text-white ml-2">&#123;</span>
        </div>

        {/* Technical skills */}
        <div className="ml-6 mb-6">
          {technicalSkills.map((skill, index) =>
            renderSkill(skill, index, "tech")
          )}
        </div>

        <div className="text-white mb-4">&#125;</div>

        {/* AI/ML Class */}
        <div className="mb-4">
          <span className="text-custom-purple">class</span>
          <span className="text-custom-yellow ml-2">AIandML</span>
          <span className="text-white ml-2">&#123;</span>
        </div>

        {/* AI skills */}
        <div className="ml-6 mb-6">
          {aiSkills.map((skill, index) => renderSkill(skill, index, "ai"))}
        </div>

        <div className="text-white mb-4">&#125;</div>

        {/* Other Skills Class */}
        <div className="mb-4">
          <span className="text-custom-purple">class</span>
          <span className="text-custom-yellow ml-2">OtherSkills</span>
          <span className="text-white ml-2">&#123;</span>
        </div>

        {/* Other skills */}
        <div className="ml-6 mb-6">
          {otherSkills.map((skill, index) =>
            renderSkill(skill, index, "other")
          )}
        </div>

        <div className="text-white mb-4">&#125;</div>

        {/* Export statement */}
        <div className="mt-6 text-custom-gray">
          // Always learning and expanding my skillset
        </div>
      </div>
    </div>
  );
};

export default Skills;

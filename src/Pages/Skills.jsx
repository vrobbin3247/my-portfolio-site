import React from "react";

const Skills = () => {
  // Technical skills with proficiency levels based on your resume and GitHub
  const technicalSkills = [
    { name: "Python", proficiency: 90 },
    { name: "React + TypeScript", proficiency: 85 },
    { name: "Streamlit", proficiency: 80 },
    { name: "Tailwind CSS", proficiency: 85 },
    { name: "Flask", proficiency: 70 },
    { name: "Docker", proficiency: 65 },
    { name: "Git", proficiency: 80 },
  ];

  // AI/ML and data skills
  const aiSkills = [
    { name: "Deep Learning (U-Net)", proficiency: 80 },
    { name: "TensorFlow", proficiency: 75 },
    { name: "Data Analysis (Pandas)", proficiency: 85 },
    { name: "Time Series Forecasting", proficiency: 70 },
    { name: "Computer Vision", proficiency: 75 },
  ];

  // Cloud and tools
  const otherSkills = [
    { name: "AWS", proficiency: 65 },
    { name: "Vercel", proficiency: 70 },
    { name: "Blender", proficiency: 60 },
    { name: "Adobe Illustrator", proficiency: 60 },
    { name: "Photography", proficiency: 75 },
    { name: "3D Modelling & Design", proficiency: 60 },
    { name: "Project Management", proficiency: 70 },
  ];

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
      <div className="flex flex-col">
        <div className="text-custom-gray mb-4">// Skills and competencies</div>

        <div className="mb-4">
          <span className="text-custom-purple">class</span>
          <span className="text-custom-yellow ml-2">TechnicalSkills</span>
          <span className="text-white ml-2">&#123;</span>
        </div>
        <div className="ml-6 mb-6">
          {technicalSkills.map((skill, index) =>
            renderSkill(skill, index, "tech")
          )}
        </div>
        <div className="text-white mb-4">&#125;</div>

        <div className="mb-4">
          <span className="text-custom-purple">class</span>
          <span className="text-custom-yellow ml-2">AIandML</span>
          <span className="text-white ml-2">&#123;</span>
        </div>
        <div className="ml-6 mb-6">
          {aiSkills.map((skill, index) => renderSkill(skill, index, "ai"))}
        </div>
        <div className="text-white mb-4">&#125;</div>

        <div className="mb-4">
          <span className="text-custom-purple">class</span>
          <span className="text-custom-yellow ml-2">OtherSkills</span>
          <span className="text-white ml-2">&#123;</span>
        </div>
        <div className="ml-6 mb-6">
          {otherSkills.map((skill, index) =>
            renderSkill(skill, index, "other")
          )}
        </div>
        <div className="text-white mb-4">&#125;</div>

        <div className="mt-6 text-custom-gray">
          // Always learning and expanding my expertise
        </div>
      </div>
    </div>
  );
};

export default Skills;

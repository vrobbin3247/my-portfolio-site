import React from "react";
import AnimatedSkillBar from "../components/AnimatedSkillBar";

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
      <div key={`${prefix}-${index}`} className="mb-3">
        <div className="flex items-center text-xs md:text-sm">
          <span className="text-custom-gray w-6 text-right mr-2">
            {index + 1}
          </span>
          <span className="text-custom-yellow mr-1.5">const</span>
          <span className="text-custom-blue mr-1.5">{skill.name}</span>
          <span className="text-custom-text mr-1.5">=</span>
          <span className="text-custom-green">{skill.proficiency}%</span>
          <span className="text-custom-text">;</span>
        </div>
        <AnimatedSkillBar proficiency={skill.proficiency} />
      </div>
    );
  };

  return (
    <div className="bg-custom-background text-custom-text p-4 md:p-8 font-cascadia w-full min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-custom-gray text-sm md:text-base mb-4">
          // Skills and competencies
        </div>

        <div className="mb-4 text-base md:text-lg">
          <span className="text-custom-purple">class</span>
          <span className="text-custom-yellow ml-2">TechnicalSkills</span>
          <span className="text-custom-text ml-2">&#123;</span>
        </div>
        <div className="pl-4 md:pl-6 mb-4">
          {technicalSkills.map((skill, index) =>
            renderSkill(skill, index, "tech")
          )}
        </div>
        <div className="text-custom-text mb-4 text-base md:text-lg">&#125;</div>

        <div className="mb-4 text-base md:text-lg">
          <span className="text-custom-purple">class</span>
          <span className="text-custom-yellow ml-2">AIandML</span>
          <span className="text-custom-text ml-2">&#123;</span>
        </div>
        <div className="pl-4 md:pl-6 mb-4">
          {aiSkills.map((skill, index) => renderSkill(skill, index, "ai"))}
        </div>
        <div className="text-custom-text mb-4 text-base md:text-lg">&#125;</div>

        <div className="mb-4 text-base md:text-lg">
          <span className="text-custom-purple">class</span>
          <span className="text-custom-yellow ml-2">OtherSkills</span>
          <span className="text-custom-text ml-2">&#123;</span>
        </div>
        <div className="pl-4 md:pl-6 mb-4">
          {otherSkills.map((skill, index) =>
            renderSkill(skill, index, "other")
          )}
        </div>
        <div className="text-custom-text mb-4 text-base md:text-lg">&#125;</div>

        <div className="mt-6 text-custom-gray text-sm">
          // Always learning and expanding my expertise
        </div>
      </div>
    </div>
  );
};

export default Skills;

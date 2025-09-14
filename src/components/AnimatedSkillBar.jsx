import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedSkillBar = ({ proficiency }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.1, // Trigger when 10% of the element is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const barVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${proficiency}%`,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      ref={ref}
      className="ml-8 mt-1.5 bg-custom_purple_washed h-1 w-full rounded-full overflow-hidden"
    >
      <motion.div
        className="bg-custom-purple h-full rounded-full"
        initial="hidden"
        animate={controls}
        variants={barVariants}
      />
    </div>
  );
};

export default AnimatedSkillBar;

import React, { useEffect, useState } from "react";

const Typewriter = () => {
  const words = [
    "Hello, World!",
    "Welcome to my website!",
    "This is a typewriter effect.",
  ];
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[loopIndex];
      if (isDeleting) {
        setText(currentWord.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setLoopIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setText(currentWord.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex === currentWord.length) {
          setIsDeleting(true);
        }
      }
    };

    const timer = setTimeout(handleTyping, 100);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [charIndex, isDeleting, loopIndex, words]);

  return (
    <div>
      <h1
        id="typewriter"
        className="fixed top-[550px] left-[600px] text-5xl font-cascadia text-custom-purple"
      >
        {text}
      </h1>
    </div>
  );
};

export default Typewriter;

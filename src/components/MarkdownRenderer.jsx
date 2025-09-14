import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coldarkDark,
  coy,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownRenderer = ({ content }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // This function takes a syntax highlighter theme and overrides its default container styles
  const getFinalStyle = (themeStyle) => ({
    ...themeStyle,
    'pre[class*="language-"]': {
      ...themeStyle['pre[class*="language-"]'],
      // Reset container styles. We'll handle these with Tailwind on the wrapper div.
      margin: "0",
      padding: "0",
      background: "transparent",
      border: "none",
      borderRadius: "0",
    },
    'code[class*="language-"]': {
      ...themeStyle['code[class*="language-"]'],
      background: "transparent", // Ensure code tag also has no background
    },
  });

  const syntaxHighlighterStyle =
    theme === "dark" ? getFinalStyle(coldarkDark) : getFinalStyle(coy);

  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            return !inline && match ? (
              // Use a wrapper div to handle all container styling
              <div className="p-4 rounded-lg overflow-hidden border-0 bg-custom-background">
                <SyntaxHighlighter
                  style={syntaxHighlighterStyle}
                  language={language}
                  showLineNumbers={true}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className="bg-custom-purple-washed rounded px-1 py-0.5 text-sm border-0"
                {...props}
              >
                {children}
              </code>
            );
          },

          img({ node, ...props }) {
            return (
              <img {...props} className="rounded shadow-md" alt={props.alt} />
            );
          },

          p({ node, ...props }) {
            return <p {...props} className="my-4 text-custom-text" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

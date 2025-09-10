import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            return !inline && match ? (
              <div className="my-4 rounded-lg overflow-hidden border-0">
                <SyntaxHighlighter
                  style={coldarkDark}
                  language={language}
                  PreTag="div"
                  className="rounded-lg border-0"
                  customStyle={{
                    background: "#0f172a",
                    border: "none",
                    margin: 0,
                    padding: "1rem",
                    borderRadius: "0.5rem",
                  }}
                  showLineNumbers={true}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className="bg-gray-700 rounded px-1 py-0.5 text-sm border-0"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; // ✅ parse raw HTML in Markdown
import remarkGfm from "remark-gfm"; // ✅ optional, for tables, etc.
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]} // ✅ allow HTML like <div> and <img>
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

          img({ node, ...props }) {
            return (
              <img {...props} className="rounded shadow-md" alt={props.alt} />
            );
          },

          p({ node, ...props }) {
            return <p {...props} className="my-4 text-gray-300" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

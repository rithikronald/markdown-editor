import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { io } from "socket.io-client";
import "./App.css";

// socket connection for real-time update
const socket = io("http://localhost:3000");

function App() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  // function to handle markdown input changes
  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  // fetch converted HTML from the backend
  useEffect(() => {
    socket.emit("markdown", markdown);
  }, [markdown]);

  useEffect(() => {
    socket.on("html", (data) => setHtml(data));
    return () => socket.off("html");
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h2 className="header-text">Real-Time Markdown Editor</h2>
      </div>
      <div className="editor-container">
        <textarea
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder="Type your Markdown here..."
        />
        <div className="preview">
          <ReactMarkdown
            components={{
              code({ className, children, ...rest }) {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    PreTag="div"
                    language={match[1]}
                    style={dracula}
                    {...rest}
                  >
                    {children}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default App;

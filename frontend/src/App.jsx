import Prism from "prismjs";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-python";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

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

  useEffect(() => {
    Prism.highlightAll();
  }, [html]);

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
        <div className="preview" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

export default App;

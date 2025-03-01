import React, { useEffect, useState } from "react";
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
      <h1>Markdown Editor </h1>
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

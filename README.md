# Real-Time Markdown Editor

This is a real-time Markdown editor built using **Node.js, Express, Socket.io, and React**. The application allows users to write Markdown in a text area and instantly preview the rendered HTML in real-time.

## Features

- Live Markdown editing with real-time preview.
- Uses **WebSockets (Socket.io)** for instant updates.
- Backend processing with **Node.js**.
- Stateless architecture (no database required).

---

## Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/rithikronald/markdown-editor
cd markdown-editor
```

### 2️⃣ Install Dependencies

#### Backend Setup

```sh
cd backend
npm install
```

#### Frontend Setup

```sh
cd ../frontend
npm install
```

---

## Running the Application

### 1️⃣ Start the Backend Server

```sh
cd backend
node server.js
```

✅ Server will run on [**http://localhost:3000**](http://localhost:5000)

### 2️⃣ Start the Frontend React App

```sh
cd frontend
npm run dev   # If using Vite
npm start     # If using Create React App
```

✅ Frontend will run on [**http://localhost:5173**](http://localhost:5173)

---

## Usage

- Type Markdown text in the left pane (textarea).
- The rendered HTML will appear in the right pane in real-time.

---

### Example Markdown

You can try the following Markdown examples in the editor:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold Text**

*Italic Text*

- List Item 1
- List Item 2

   m
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEffect } from "react";

import Gallery from "./components/Gallery/Gallery.jsx";
import Create from "./components/Create/create.jsx";
import Ideas from "./components/Ideas/Ideas.jsx";
import Error404 from "./components/Error404.jsx";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

export function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default App;

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data fetched from database");
        console.log(data);
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create setProjects={setProjects} />} />
        <Route
          path="/gallery"
          element={<Gallery projects={projects} setProjects={setProjects} />}
        />
        <Route path="/ideas" element={<Ideas />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );

  //HOME Contains three buttons to go to different pages
  function Home() {
    return (
      <div className="home-container">
        <h1>The Project Palace</h1>
        <h3>What would you like to do?</h3>
        <div className="link-button">
          <Button>
            <Link to="/create">Create 🎨</Link>
          </Button>
        </div>
        <div className="link-button">
          <Button>
            <Link to="/gallery">See My Projects 🖼️</Link>
          </Button>
        </div>
        <div className="link-button">
          <Button>
            <Link to="/ideas">Get Ideas 💡</Link>
          </Button>
        </div>
      </div>
    );
  }
}

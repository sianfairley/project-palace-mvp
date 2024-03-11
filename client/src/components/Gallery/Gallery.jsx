import { useState, useEffect } from "react";

import ProjectCard from "./ProjectCard";

import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../Navbar";

function Gallery({ projects, setProjects }) {
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
      <div>
        <Navbar />
      </div>

      <h3 className="page-header">My Projects</h3>
      {/* Maps through the projects and renders each project card */}
      <div className="container overflow-hidden">
        <div className="row justify-content-center">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-list-item col col-sm-12 col-md-6 col-lg-3 p-3 m-1"
            >
              <ProjectCard project={project} setProjects={setProjects} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;

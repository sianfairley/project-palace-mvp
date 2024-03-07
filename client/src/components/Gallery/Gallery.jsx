import { useState, useEffect } from "react";

import { MdFavorite, MdFavoriteBorder, MdEdit } from "react-icons/md";
import { FaRegCircleCheck, FaRegEye } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

import DeleteProjectButton from "./DeleteProject";
import ProjectModal from "./ProjectModal";
import SearchProjects from "./SearchProjects";
import EditProject from "./EditProject";
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
      <div>
        <SearchProjects />
      </div>
      {/* <div className="container sm-1 md-3 lg-4">
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.id} className="project-list-item">
              <ProjectCard project={project} setProjects={setProjects} />
            </li>
          ))}
        </ul>
      </div> */}
      <div className="container">
        <div className="row">
          {projects.map((project) => (
            <div
              key={project.id}
              className="col-lg-4 col-md-6 project-list-item m-2"
            >
              <ProjectCard
                project={project}
                setProjects={setProjects}
                className="project-card"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, setProjects }) {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [openEditProject, setOpenEditProject] = useState(false);

  const toggleFavorite = () => {
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`/api/projects/favorites/${project.id}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((error) => console.log(error));
  };

  const toggleComplete = () => {
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`/api/projects/completed/${project.id}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((error) => console.log(error));
  };

  const openProjectModal = () => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };

  const viewEditProject = () => {
    setSelectedProject(project);
    setOpenEditProject(!openEditProject);
  };

  return (
    <div>
      <div>
        <img src={project.image} alt={project.name} className="project-image" />
      </div>

      <div className="button-container">
        <button onClick={(e) => toggleFavorite(project.id)}>
          {project.favorite ? (
            <MdFavorite style={{ color: "var(--bright-pink)" }} />
          ) : (
            <MdFavoriteBorder />
          )}
        </button>
        <button onClick={(e) => toggleComplete(project.id)}>
          {project.complete ? (
            <FaRegCircleCheck style={{ color: "var(--bright-pink)" }} />
          ) : (
            <FaRegCircleCheck />
          )}
        </button>

        <button
          onClick={viewEditProject}
          // type="button"
          // className="btn btn-light"
          // data-toggle="modal"
          // data-target="#editForm"
        >
          {openEditProject ? (
            <MdEdit style={{ color: "var(--mid-purple)" }} />
          ) : (
            <MdEdit style={{ color: "var(--dark-purple)" }} />
          )}
        </button>

        <button onClick={() => setDeleteWarning(true)}>
          <FaRegTrashAlt />
        </button>
        {deleteWarning && (
          <div className="alert alert-success mt-3" role="alert">
            <h5>Delete project?</h5>
            <DeleteProjectButton project={project} setProjects={setProjects} />
            <button
              type="button"
              className="close"
              onClick={() => setDeleteWarning(false)}
            >
              No ❌
            </button>
          </div>
        )}
      </div>

      <button
        onClick={openProjectModal}
        type="button"
        className="btn btn-light"
        data-toggle="modal"
        data-target="#projectModal"
      >
        <FaRegEye />
      </button>
      {projectModalOpen && (
        <ProjectModal project={project} setProjects={setProjects} />
      )}
      {openEditProject && (
        <EditProject
          project={project}
          setProjects={setProjects}
          openEditProject={openEditProject}
          setOpenEditProject={setOpenEditProject}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      )}
    </div>
  );
}

export default Gallery;

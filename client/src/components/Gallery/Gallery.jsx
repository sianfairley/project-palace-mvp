import { useState } from "react";

import { MdFavorite, MdFavoriteBorder, MdEdit } from "react-icons/md";
import { FaRegCircleCheck, FaRegEye } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

import DeleteProjectButton from "./DeleteProject";
import ProjectModal from "./ProjectModal";
import EditForm from "./EditForm";
import "bootstrap/dist/css/bootstrap.css";

function Gallery({ projects, setProjects }) {
  return (
    <div>
      <ul>
        {projects.map((project) => (
          <ProjectCard
            project={project}
            key={project.id}
            setProjects={setProjects}
          />
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ project, setProjects }) {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [editForm, setEditForm] = useState(false);

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
    setProjectModalOpen(true);
  };

  const openEditForm = () => {
    setEditForm(true);
  };

  return (
    <div>
      <div>
        <img src={project.image} alt={project.name} className="image-gallery" />
      </div>

      <div>
        <button onClick={(e) => toggleFavorite(project.id)}>
          {project.favorite ? <MdFavorite /> : <MdFavoriteBorder />}
        </button>
        <button onClick={(e) => toggleComplete(project.id)}>
          {project.complete ? <p>Finished!</p> : <FaRegCircleCheck />}
        </button>

        <button
          onClick={openEditForm}
          type="button"
          className="btn btn-light"
          data-toggle="modal"
          data-target="#editForm"
        >
          <MdEdit />
        </button>
        {editForm && <EditForm project={project} setProjects={setProjects} />}
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
    </div>
  );
}

export default Gallery;

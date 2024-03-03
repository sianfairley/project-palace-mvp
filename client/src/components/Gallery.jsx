import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  MdFavorite,
  MdFavoriteBorder,
  MdEdit,
  MdEditOff,
} from "react-icons/md";
import { FaRegCircleCheck, FaRegEye } from "react-icons/fa6";

import DeleteProjectButton from "./DeleteProject";
import ProjectModal from "./ProjectModal";
import EditBox from "./EditProject";
import "bootstrap/dist/css/bootstrap.css";

function Gallery({ projects, setProjects }) {
  //DEal with projects - sits in ProjectCard
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

function ProjectCard({ project, setProjects, showcase, setShowcase }) {
  const [editBox, setEditBox] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

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

  const toggleEditBox = () => {
    setEditBox(!editBox);
  };

  const openProjectModal = () => {
    setProjectModalOpen(true);
  };

  return (
    <div>
      <h4>{project.projectname}</h4>
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
        <DeleteProjectButton project={project} setProjects={setProjects} />
        <button onClick={toggleEditBox}>
          {editBox ? <MdEditOff /> : <MdEdit />}
        </button>

        {editBox ? (
          <EditBox project={project} setProjects={setProjects} />
        ) : null}
      </div>

      <button
        onClick={openProjectModal}
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#projectModal"
      >
        Modal <FaRegEye />
      </button>
      {projectModalOpen && <ProjectModal project={project} />}
    </div>
  );
}

export default Gallery;

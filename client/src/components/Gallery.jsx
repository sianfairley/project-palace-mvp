import { useState } from "react";

import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdEditOff } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.css";

//Split project into separate component. Pass projects as prop or use component composition?
function Gallery({ projects, setProjects }) {
  return (
    <div>
      View projects here
      <AllProjects projects={projects} setProjects={setProjects} />
    </div>
  );
}

//Project component - shows image and name. onClick shows all info. Accepts projects as a prop from gallery
function AllProjects({ projects, setProjects }) {
  return (
    <ul>
      {projects.map((project) => (
        // Creates a project from each item in the array and gives it a key
        <ProjectCard
          project={project}
          key={project.id}
          setProjects={setProjects}
        />
      ))}
    </ul>
  );
}

function ProjectCard({ project, setProjects }) {
  //Fetch to toggle favorite on front and backend
  const [editBox, setEditBox] = useState("false");

  const toggleFavorite = () => {
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`/api/projects/${project.id}`, options)
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

  return (
    <>
      <h4>{project.projectname}</h4>
      <div>
        <img src={project.image} alt={project.name} className="image-gallery" />
      </div>

      {/* Add onClick to toggle favourite */}
      <div>
        <button onClick={(e) => toggleFavorite(project.id)}>
          {project.favorite ? <MdFavorite /> : <MdFavoriteBorder />}
        </button>
        <DeleteProjectButton project={project} setProjects={setProjects} />
        <button onClick={toggleEditBox}>
          {editBox ? <MdEditOff /> : <MdEdit />}
        </button>
        {editBox ? (
          <EditBox project={project} setProjects={setProjects} />
        ) : null}
      </div>
    </>
  );
}

// Form takes id of selected button
function EditBox({ project, setProjects }) {
  return (
    <form>
      <h6>Form to edit {project.projectname}</h6>
      <input
        name="projectname"
        value={project.projectname}
        placeholder={project.projectname}
        label="name"
      ></input>
      <input type="text" name="materials" value={project.materials}></input>
      <input type="text" name="description" value={project.description}></input>
      <input type="text" name="image" value={project.image}></input>
    </form>
  );
}

//DELETE
function DeleteProjectButton({ project, setProjects }) {
  const handleDelete = () => {
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`/api/projects/${project.id}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <button
      type="button"
      className="btn btn-primary"
      data-toggle="modal"
      data-target="#deletemodal"
      onClick={(e) => handleDelete(project.id)}
    >
      <TiDelete />
    </button>
  );
}

export default Gallery;

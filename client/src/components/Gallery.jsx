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
    </div>
  );
}

function ProjectCard({ project, setProjects }) {
  //Fetch to toggle favorite on front and backend
  const [editBox, setEditBox] = useState(false);

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

  // EDIT project
  function EditBox({ project, setProjects }) {
    return (
      <form>
        <h6>Edit {project.projectname}</h6>
        <div>
          <input
            name="projectname"
            value={project.projectname}
            placeholder={project.projectname}
            label="name"
          ></input>
        </div>
        <div>
          <select label="type" value={project.type} name="type">
            <option>Paper craft</option>
            <option>Knitting</option>
            <option>Sewing</option>
            <option>Painting and drawing</option>
            <option>Collage</option>
            <option>Fimo and clay</option>
            {/* Option to write own type */}
          </select>
        </div>
        <div>
          <input type="text" name="materials" value={project.materials}></input>
        </div>
        <div>
          <input
            type="text"
            name="description"
            value={project.description}
          ></input>
        </div>
        <div>
          <input type="text" name="image" value={project.image}></input>
        </div>
      </form>
    );
  }

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
      className="btn btn-light"
      data-toggle="modal"
      data-target="#deletemodal"
      onClick={(e) => handleDelete(project.id)}
    >
      <TiDelete />
    </button>
  );
}

//CONFIRM DELETE

// function ViewProject() {
//   return (
//     <div>View selected project</div>
//   )
// }

export default Gallery;

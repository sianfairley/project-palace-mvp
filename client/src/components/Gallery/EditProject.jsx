import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function EditProject({
  project,
  setProjects,
  setOpenEditProject,
}) {
  const [updatedProject, setUpdatedProject] = useState({
    projectname: project.projectname,
    type: project.type,
    materials: project.materials,
    description: project.description,
    image: project.image,
  });
  const [ProjectUpdate, SetProjectUpdate] = useState(false);

  const handleChange = (e) => {
    setUpdatedProject({
      ...updatedProject,
      [e.target.name]: e.target.value,
    });
  };

  function ConfirmProjectUpdate() {
    return (
      <div className="confirm-project-update">
        <h5>Project updated!</h5>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // fetch - PUT request
    fetch(`/api/projects/update/${project.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to updated project");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Project updated:", data);
        setProjects(data);
        SetProjectUpdate(true);
      })
      .catch((error) => {
        console.log("Error updating project", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-project-form p-3">
      <h5>Edit {project.projectname}</h5>
      <div className="form-items">
        <div>
          <label>Name: </label>
          <input
            name="projectname"
            value={updatedProject.projectname}
            placeholder={project.projectname}
            label="name"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Type: </label>
          <select
            label="type"
            placeholder={project.type}
            value={updatedProject.type}
            name="type"
            onChange={handleChange}
          >
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
          <label>Materials: </label>
          <input
            type="text"
            size="auto"
            name="materials"
            placeholder={project.materials}
            value={updatedProject.materials}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={updatedProject.description}
            placeholder={project.description}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Image: </label>
          <input
            type="text"
            name="image"
            value={updatedProject.image}
            placeholder={project.image}
            onChange={handleChange}
          ></input>
        </div>
        {ProjectUpdate ? <ConfirmProjectUpdate /> : null}
        <button className="btn btn-light ">Change project</button>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => setOpenEditProject(false)}
        >
          <IoClose />
        </button>
      </div>
    </form>
  );
}

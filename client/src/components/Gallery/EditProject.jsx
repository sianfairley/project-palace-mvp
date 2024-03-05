import { useState } from "react";

export default function EditBox({ project, setProjects }) {
  const [updatedProject, setUpdatedProject] = useState({
    projectname: project.projectname,
    type: project.type,
    materials: project.materials,
    description: project.description,
    image: project.image,
  });

  const handleChange = (e) => {
    setUpdatedProject({
      ...updatedProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProject = {
      ...project,
      ...updatedProject,
    };

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
      })
      .catch((error) => {
        console.log("Error updating project", error);
      });
  };

  return (
    <form onSubmit={() => handleSubmit()}>
      <h6>Edit {project.projectname}</h6>
      <div>
        <input
          name="projectname"
          value={updatedProject.projectname}
          placeholder={project.projectname}
          label="name"
          onChange={handleChange}
        ></input>
      </div>
      <div>
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
        <input
          type="text"
          name="materials"
          placeholder={project.materials}
          value={updatedProject.materials}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <input
          type="text"
          name="description"
          value={updatedProject.description}
          placeholder={project.description}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <input
          type="text"
          name="image"
          value={updatedProject.image}
          placeholder={project.image}
          onChange={handleChange}
        ></input>
      </div>
      <button className="btn btn-light">Change project</button>
    </form>
  );
}

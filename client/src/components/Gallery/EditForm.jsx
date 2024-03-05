import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function EditForm({ project, setProjects }) {
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
    <div
      className="modal fade"
      id="editForm"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="editForm"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editForm">
              Change {project.projectname}
            </h5>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name: </label>
                <input
                  name="projectname"
                  value={updatedProject.projectname}
                  placeholder={project.projectname}
                  label="projectname"
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
              <button className="btn btn-light">Change project</button>
            </form>

            <div>
              <button
                type="button"
                className="btn btn-light"
                data-dismiss="modal"
              >
                <IoClose />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

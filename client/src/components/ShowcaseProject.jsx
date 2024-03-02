import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function ShowcaseProject() {
  //Extracts parameters as object
  const { id } = useParams();
  const [project, setProject] = useState([]);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProject(data); // Set the project details
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
      });
  }, []);
  console.log("Project ID:", project.id);
  //Create modal to show project info
  return (
    <div
      className="modal fade"
      id="showcaseModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {project.projectname}
            </h5>
          </div>
          <div className="modal-body">
            <img className="image-gallery" src={project.image} />
            <ul>
              <li>{project.type}</li>
              <li>{project.description}</li>
              <li>{project.materials}</li>
            </ul>
            <div>
              <button
                type="button"
                className="btn btn-secondary"
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

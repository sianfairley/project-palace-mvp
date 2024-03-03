import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function ProjectModal({ project }) {
  //Create modal to show project info
  return (
    <div
      className="modal fade"
      id="projectModal"
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

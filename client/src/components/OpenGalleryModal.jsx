import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function OpenGalleryModal() {
  return (
    <div
      className="modal fade"
      id="openGalleryModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div>
              <button>
                <NavLink to="/gallery">See my projects</NavLink>
              </button>
            </div>
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

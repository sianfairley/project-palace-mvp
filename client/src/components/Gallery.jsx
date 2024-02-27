import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdEdit } from "react-icons/md";
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
        <ButtonTriggerDeleteConfirmation />
        <button>
          <MdEdit />
        </button>
      </div>
    </>
  );
}

function ButtonTriggerDeleteConfirmation() {
  return (
    <button
      type="button"
      className="btn btn-primary"
      data-toggle="modal"
      data-target="#deletemodal"
    >
      <TiDelete />
    </button>
  );
}

// function DeleteConfirmationModal() {
//   return (
//     <div
//       className="modal fade"
//       id="deletemodal"
//       tabindex="-1"
//       role="dialog"
//       aria-labelledby="exampleModalLabel"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="exampleModalLabel">
//               Delete this project?
//             </h5>
//             <button
//               type="button"
//               className="close"
//               data-dismiss="modal"
//               aria-label="Close"
//             >
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">...</div>
//           <div className="modal-footer">
//             <button
//               type="button"
//               className="btn btn-secondary"
//               data-dismiss="modal"
//             >
//               Close
//             </button>
//             <button type="button" className="btn btn-primary">
//               Save changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default Gallery;

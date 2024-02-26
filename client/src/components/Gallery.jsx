import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

//Split project into separate component. Pass projects as prop or use component composition?
function Gallery({ projects }) {
  return (
    <div>
      View projects here
      <AllProjects projects={projects} />
    </div>
  );
}

//Project component - shows image and name. onClick shows all info. Accepts projects as a prop from gallery
function AllProjects({ projects }) {
  return (
    <ul>
      {projects.map((project) => (
        // Creates a project from each item in the array and gives it a key
        <ProjectCard project={project} key={project.id} />
      ))}
    </ul>
  );
}

function ProjectCard({ project }) {
  return (
    <>
      <h4>{project.projectname}</h4>
      <div>
        <img src={project.image} alt={project.name} />
      </div>

      {/* Add onClick to toggle favourite */}
      <div>
        <button>
          {project.favourite ? <MdFavorite /> : <MdFavoriteBorder />}
        </button>
        <button>
          <TiDelete />
        </button>
        <button>
          <MdEdit />
        </button>
      </div>
    </>
  );
}

export default Gallery;

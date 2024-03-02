import { FaRegTrashAlt } from "react-icons/fa";

export default function DeleteProjectButton({ project, setProjects }) {
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
      <FaRegTrashAlt />
    </button>
  );
}

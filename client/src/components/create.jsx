import { useState } from "react";
// import Button from "./src/App.jsx";

function Create({ setProjects }) {
  const [input, setInput] = useState({
    projectname: "",
    type: "",
    materials: "",
    description: "",
    image: "",
    complete: false,
    favorite: false,
  });

  //Gets input
  const handleChange = (e) => {
    setInput((input) => ({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSubmitProject = (event) => {
    event.preventDefault();
    addProject();
  };

  // POST add new project
  const addProject = () => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    };

    //
    fetch("/api/projects", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmitProject}>
        <h2>Create a new project</h2>
        <div>
          <h5>1. Give your project a name</h5>
          <input
            type="text"
            label="project name"
            value={input.projectname}
            name="projectname"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <h5>2. Choose a craft</h5>
          <select
            label="type"
            value={input.type}
            onChange={handleChange}
            name="type"
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
          <h5>3. What are your materials?</h5>
          <input
            type="text"
            label="materials"
            name="materials"
            value={input.materials}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <h5>4. Describe your project</h5>
          <input
            type="text"
            label="description"
            name="description"
            value={input.description}
            onChange={handleChange}
          ></input>
        </div>
        {/* Is it possible to map through preset images and insert as component? */}
        <div>
          <h5>5. Add an image</h5>
          <p>
            You can also add a photo or your project later when you have
            finished.
          </p>
          <input
            type="text"
            label="image url"
            placeholder="image url"
            name="image"
            value={input.image}
            onChange={handleChange}
          ></input>
          <h5>or choose one</h5>
          {/* //Make sure no buttons are selected on load */}
          {/* <label>
                <input type="radio" id="image1" name="presetImage" />
                <img
                  className="image-select"
                  src="src/assets/knitting.jpg"
                  alt="knitting"
                />
              </label>
    
              <label>
                <input
                  type="radio"
                  id="image2"
                  name="presetImage"
                  // value={src/assets/scrapbook.jpg}
                />
                <img
                  className="image-select"
                  src="src/assets/scrapbook.jpg"
                  alt="Scrapbooking"
                />
              </label> */}
        </div>
        <button>Create!</button>
      </form>
    </>
  );
}

export default Create;

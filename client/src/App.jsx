import { useState } from "react";
import { useEffect } from "react";

import Gallery from "./components/Gallery.jsx";

import "./App.css";

function App() {
  const [pageView, setPageView] = useState("home");
  const [projects, setProjects] = useState([]);

  //Use GET to fetch all projects, setProjects will update projects state and render in Gallery on load
  useEffect(() => {
    //GET all items from database
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        // upon success, update tasks
        console.log("Data fetched from database");
        console.log(data);
        setProjects(data);
      })
      .catch((error) => {
        // upon failure, show error message
        console.error("Error fetching data:", error);
      });
  }, []);

  // Conditional rendering to set the view - home view renders by default in useState
  return (
    <div>
      <NavBar handlePageView={setPageView} />
      {pageView === "home" && <Home handlePageView={setPageView} />}
      {pageView === "create" && (
        <Create handlePageView={setPageView} setProjects={setProjects} />
      )}
      {pageView === "gallery" && (
        <Gallery handlePageView={setPageView} projects={projects} />
      )}
      {pageView === "ideas" && <Ideas handlePageView={setPageView} />}
    </div>
  );
}

//Reusable button
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function NavBar({ handlePageView }) {
  return (
    <>
      {/* Button to set view to landing (homepage) */}
      <Button onClick={() => handlePageView("home")}>🏠</Button>
      <h1>My Craftbook</h1>
    </>
  );
}

//HOME Contains three buttons to go to different pages
function Home({ handlePageView }) {
  return (
    <div>
      <div>
        <Button onClick={() => handlePageView("create")}>Create</Button>
      </div>
      <div>
        <Button onClick={() => handlePageView("gallery")}>My Projects</Button>
      </div>
      <div>
        <Button onClick={() => handlePageView("ideas")}>Get Ideas</Button>
      </div>
    </div>
  );
}

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
          <h3>1. Give your project a name</h3>
          <input
            type="text"
            label="project name"
            value={input.projectname}
            name="projectname"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <h3>2. Choose a craft</h3>
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
          <h3>3. What are your materials?</h3>
          <input
            type="text"
            label="materials"
            name="materials"
            value={input.materials}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <h3>4. Describe your project</h3>
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
          <h3>5. Add an image</h3>
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
          <h3>or choose one</h3>
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
        <Button>Create!</Button>
      </form>
    </>
  );
}

//Youtube API
function Ideas() {
  return <div>Get ideas here</div>;
}

//selectedProject - get by id. Set value with the project info. on submit, use UPDATE/PUT

//showImage component -
export default App;

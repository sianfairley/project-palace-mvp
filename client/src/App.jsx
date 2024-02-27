import { useState } from "react";
import { useEffect } from "react";

import Gallery from "./components/Gallery.jsx";
import Create from "./components/create.jsx";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
        <Gallery
          handlePageView={setPageView}
          projects={projects}
          setProjects={setProjects}
        />
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

//Youtube API
function Ideas() {
  return <div>Get ideas here</div>;
}

//selectedProject - get by id. Set value with the project info. on submit, use UPDATE/PUT

//showImage component -
export default App;

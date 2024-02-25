import { useState } from "react";
import { useEffect } from "react";

import "./App.css";

function App() {
  const [pageView, setPageView] = useState("home");

  // Conditional rendering to set the view - useEffect loads landing view by default
  return (
    <div>
      <NavBar handlePageView={setPageView} />
      {pageView === "home" && <Home handlePageView={setPageView} />}
      {pageView === "create" && <Create handlePageView={setPageView} />}
      {pageView === "gallery" && <Gallery handlePageView={setPageView} />}
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
        <Button onClick={() => handlePageView("create")}>Get Ideas</Button>
      </div>
    </div>
  );
}

function Create() {
  return <form>Form</form>;
}

function Gallery() {
  return <div>View projects here</div>;
}

function Ideas() {
  return <div>Get ideas here</div>;
}
export default App;

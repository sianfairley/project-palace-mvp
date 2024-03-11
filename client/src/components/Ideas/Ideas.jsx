import { useState } from "react";
import YoutubeIdeas from "./YoutubeIdeas";
import ImageIdeas from "./ImageIdeas";
import Navbar from "../Navbar";

export default function Ideas() {
  // let key = import.meta.env.VITE_UNSPLASH_API_KEY;
  // const [image, setImage] = useState({});

  // const handleFetch = (searchTerm) => {
  //   fetch(
  //     `https://api.unsplash.com/photos/random?client_id=${key}&content_filter=high&query=${searchTerm}`
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setImage(data);
  //       console.log(image);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  return (
    <div>
      <Navbar />
      <h3 className="page-header">Get ideas!</h3>
      <div className="container ideas-container">
        <div className="row justify-content-center">
          <div className="col col-lg-6 p-5">
            <ImageIdeas />
          </div>

          <div className="col col-lg-6 p-5">
            <YoutubeIdeas />
          </div>
        </div>
      </div>
    </div>
  );
}

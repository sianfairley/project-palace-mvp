import { useState } from "react";
import YoutubeIdeas from "./YoutubeIdeas";

export default function Ideas() {
  let key = import.meta.env.VITE_UNSPLASH_API_KEY;
  const [image, setImage] = useState({});

  const handleFetch = (searchTerm) => {
    fetch(
      `https://api.unsplash.com/photos/random?client_id=${key}&content_filter=high&query=${searchTerm}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setImage(data);
        console.log(image);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h3>Get ideas!</h3>
      <button onClick={() => handleFetch("sewing%20craft")}>Sew</button>
      <button onClick={() => handleFetch("knitting")}>Knit</button>
      <button onClick={() => handleFetch("origami")}>Origami</button>
      <button onClick={() => handleFetch("painting")}>Paint</button>
      <div>
        {image.urls && image.urls.small && (
          <img
            className="inspo-image"
            src={image.urls.small}
            alt="Craft idea"
          />
        )}
      </div>
      <div>
        <YoutubeIdeas />
      </div>
    </div>
  );
}

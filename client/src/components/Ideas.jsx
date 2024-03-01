import { useState } from "react";

export default function Ideas() {
  const [image, setImage] = useState({});

  const handleFetch = () => {
    fetch(
      "https://api.unsplash.com/photos/random?client_id=f51yIFfX0w3GTToG2VVQaLXeVWnylvLinhzXtGTuXAQ&content_filter=high&query=craft"
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
      <button onClick={handleFetch}>Get craft ideas!</button>
      <div>
        <img className="inspo-image" src={image.urls.small} />
      </div>
    </div>
  );
}

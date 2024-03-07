import YouTube from "react-youtube";
import { useState } from "react";

export default function YoutubeIdeas() {
  const [videoId, setVideoId] = useState("");
  let key = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleYoutubeFetch = () => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&safeSearch=strict&q=kids%20craft&maxResults=20`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let videos = data.items;
        let i = Math.floor(Math.random() * videos.length);
        setVideoId(videos[i].id.videoId);
        console.log("Random video id:", videoId);
        videos.forEach((video) => {
          console.log(video.snippet.title);
          console.log(video.id.videoId);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="youtube">
      <button onClick={handleYoutubeFetch}>Find a craft video 🎬</button>
      <div>
        {videoId && (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}?start=103`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}

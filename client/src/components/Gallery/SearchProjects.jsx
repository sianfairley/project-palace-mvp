import { useState } from "react";

export default function SearchProjects() {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  console.log(search);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={handleChange}
          label="search"
          placeholder="Find a project"
        ></input>
      </form>
    </div>
  );
}

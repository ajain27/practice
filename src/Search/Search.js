import { useState, useEffect } from "react";
import "./style.css";
import Results from "./Results";
import initialData from "./data.json";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data] = useState(initialData);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filerData = data.filter((item) => {
    if (!searchTerm) {
      return item;
    }
    return item.title.toLowerCase().includes(searchTerm);
  });

  return (
    <>
      <div className="wrapper">
        <div className="autoComplete">
          <label id="search-label" for="search">
            Search Something
          </label>
          <input type="text" id="search" onChange={handleSearch} />
        </div>{" "}
        <br />
      </div>
      <Results data={filerData} />
    </>
  );
}

export default Search;

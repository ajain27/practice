import { useState } from "react";
import books from "./data.json";
import "./style.css";
import Book from "./Book";
function Books() {
  const [data, setData] = useState(books);
  const [searchTerm, setSerahcTerm] = useState("");

  const filteredData = data.filter((book) => {
    return book.title.toLowerCase().includes(searchTerm);
  });

  const sort = (by) => {
    if (by === "asc") {
      const sortedData = [...data].sort((a, b) => a.price - b.price);
      setData(sortedData);
    } else if (by === "dsc") {
      const sortedData = [...data].sort((a, b) => b.price - a.price);
      setData(sortedData);
    }
  };

  const handleAscending = () => {
    console.log("sorting");
    sort("asc");
  };
  const handleDescending = () => {
    sort("dsc");
  };

  const inputHandler = (e) => {
    setSerahcTerm(e.target.value.toLowerCase());
  };

  const handleSortingFromSelect = (e) => {
    if (e.target.value === "price") {
      handleAscending();
    } else {
      const sortedData = [...data].sort((a, b) => b.rating - a.rating);
      setData(sortedData);
    }
  };

  return (
    <div>
      <div className="books-container">
        <div className="books-controls">
          <input
            placeholder="Search books..."
            id="name"
            onChange={inputHandler}
            value={searchTerm}
          />
          <select onChange={handleSortingFromSelect}>
            <option>Sort by</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
          <button onClick={handleAscending}>Sort By Ascending</button>
          <button onClick={handleDescending}>Sort By Descending</button>
        </div>

        <div className="books-grid">
          {filteredData.map((book) => (
            <Book book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Books;

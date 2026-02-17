import { useState } from "react";
import books from "./data.json";
import "./style.css";
import Book from "./Book";
import useDebounce from "./hooks/useDebounce";

function Books() {
  const [data, setData] = useState(books);
  const [searchTerm, setSerahcTerm] = useState("");

  const debounceValue = useDebounce(searchTerm, 1000);

  const ASCENDING = "asc";
  const DESCENDING = "dsc";

  const filteredData = data.filter((book) => {
    return book.title.toLowerCase().includes(debounceValue);
  });

  const sort = (by) => {
    if (by === ASCENDING) {
      const sortedData = [...data].sort((a, b) => a.price - b.price);
      setData(sortedData);
    } else if (by === DESCENDING) {
      const sortedData = [...data].sort((a, b) => b.price - a.price);
      setData(sortedData);
    }
  };

  const handleAscending = () => {
    sort(ASCENDING);
  };
  const handleDescending = () => {
    sort(DESCENDING);
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
          <div className="sort-container">
            <select className="sort-select" onChange={handleSortingFromSelect}>
              <option value="">Sort by</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div className="sort-buttons">
            <button onClick={handleAscending} className="btn btn-asc">
              Ascending
            </button>
            <button onClick={handleDescending} className="btn btn-desc">
              Descending
            </button>
          </div>
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

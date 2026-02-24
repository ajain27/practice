import { useState } from "react";
import books from "./data.json";
import "./style.css";
import Book from "./Book";
import useDebounce from "./hooks/useDebounce";
import Controls from "./Controls";

function Books() {
  const [data, setData] = useState(books);
  const [searchTerm, setSerahcTerm] = useState("");

  const debounceValue = useDebounce(searchTerm, 500);

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
        <Controls
          inputHandler={inputHandler}
          searchTerm={searchTerm}
          handleSortingFromSelect={handleSortingFromSelect}
          handleAscending={handleAscending}
          handleDescending={handleDescending}
        />
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

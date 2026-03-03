function Controls({
  inputHandler,
  searchTerm,
  handleSortingFromSelect,
  handleAscending,
  handleDescending,
}) {
  return (
    <div>
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
    </div>
  );
}

export default Controls;

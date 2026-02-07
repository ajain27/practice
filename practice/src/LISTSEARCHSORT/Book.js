function Book({ book }) {
  return (
    <div>
      <div className="book-card">
        <div className="book-title">{book.title}</div>
        <div className="book-author">{book.author}</div>
        <div className="book-genre">{book.genre}</div>

        <div className="book-meta">
          <span className="book-price">{book.price}</span>
          <span className="book-rating">⭐ {book.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default Book;

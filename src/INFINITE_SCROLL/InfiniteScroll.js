import { useState, useEffect, useRef } from "react";

function InfiniteScroll() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const loaderRef = useRef(null);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      const items = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`,
      );
      const booksData = await items.json();
      setItems((prev) => [...prev, ...booksData]);
      setLoading(false);
    };

    getBooks();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading]);

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <h2>Infinite Scroll</h2>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            padding: "16px",
            margin: "12px 0",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h4>{item.title}</h4>
          <p>{item.body}</p>
        </div>
      ))}

      {loading && <p>Loading...</p>}

      <div ref={loaderRef} style={{ height: "20px" }} />
    </div>
  );
}

export default InfiniteScroll;

import "./style.css";

function Pagination({ todosPerPage, totalTodos, paginate }) {
  const pageNumber = [];
  for (let i = 1; i < Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <div>
        <nav>
          <ul className="pagination">
            {pageNumber.map((number) => (
              <li className="pageNumbers" onClick={() => paginate(number)}>
                {number}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;

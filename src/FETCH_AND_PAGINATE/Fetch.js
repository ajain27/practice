import { useEffect, useState } from "react";
// import Todos from "./Todos";
// import Pagination from "./Pagination";

function Fetch() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(10);

  useEffect(() => {
    let ignore = false;
    const getTodos = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
      if (!ignore) {
        setTodos(data);
      }
    };
    getTodos();

    return () => {
      ignore = true;
    };
  }, []);

  // get current todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumber = [];
  for (let i = 1; i < Math.ceil(todos.length / todosPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="app">
      <h2>My TODOS</h2>
      <div className="container">
        <div className="todos">
          {/* <Todos todos={currentTodos} />
           */}
          <div className="container">
            <ul>
              {currentTodos.map((todo) => (
                <li>{todo.title}</li>
              ))}
            </ul>
          </div>
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
      </div>
    </div>
  );
}

export default Fetch;

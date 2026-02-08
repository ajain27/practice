import { useEffect, useState } from "react";
import Todos from "./Todos";
import Pagination from "./Pagination";

function Fetch() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(20);

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

  return (
    <div>
      <div className="container">
        <div className="todos">
          <Todos todos={currentTodos} />
          <Pagination
            todosPerPage={todosPerPage}
            totalTodos={todos.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

export default Fetch;

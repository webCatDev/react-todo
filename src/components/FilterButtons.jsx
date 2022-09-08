import { useState } from "react";
import { Link } from "react-router-dom";

const FilterButtons = ({ todos, setTodos, onActive }) => {
  const [active, setActive] = useState("all");

  const finishedTaskCount = todos.filter((todo) => todo.isCompleted).length;
  const unfinishedTaskCount = todos.length - finishedTaskCount;
  const handleTooMuchTaskCount = (count) => (count > 9 ? "9+" : count);

  const handleClickAllTodos = () => {
    setTodos(todos);
    setActive("all");
    onActive("all");
  };

  const handleClickCompletedTodos = () => {
    setTodos(todos.filter((todo) => todo.isCompleted));
    setActive("completed");
    onActive("completed");
  };
  const handleClickUnfinishedTodos = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));

    setActive("uncompleted");
    onActive("uncompleted");
  };

  return (
    <div className="filter-buttons">
      <Link to="/">
        <button
          className={`all ${active === "all" ? "active" : ""}`}
          onClick={handleClickAllTodos}
        >
          All
          <span className="count all-todos-count">
            {handleTooMuchTaskCount(todos.length)}
          </span>
        </button>
      </Link>

      <Link to="/">
        <button
          className={`completed ${active === "completed" ? "active" : ""}`}
          onClick={handleClickCompletedTodos}
        >
          Completed
          <span className="count completed-todos-count">
            {handleTooMuchTaskCount(finishedTaskCount)}
          </span>
        </button>
      </Link>
      
      <Link to="/">
        <button
          className={`uncompleted ${active === "uncompleted" ? "active" : ""}`}
          onClick={handleClickUnfinishedTodos}
        >
          Uncompleted
          <span className="count uncompleted-todos-count">
            {handleTooMuchTaskCount(unfinishedTaskCount)}
          </span>
        </button>
      </Link>
    </div>
  );
};

export default FilterButtons;

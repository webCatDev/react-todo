import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";

const FilterButtons = ({ todos, setTodos, onActive }) => {
  const { todoCounts, activeTab} = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleTooMuchTaskCount = (count) => (count > 9 ? "9+" : count);

  const handleClickAllTodos = () => {
    setTodos(todos);
    dispatch(uiActions.changeActiveTab("all"));
  };

  const handleClickCompletedTodos = () => {
    setTodos(todos.filter((todo) => todo.isCompleted));
    dispatch(uiActions.changeActiveTab("completed"));
  };
  const handleClickUnfinishedTodos = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));
    dispatch(uiActions.changeActiveTab("uncompleted"));
  };

  return (
    <div className="filter-buttons">
      <Link to="/">
        <button
          className={`all ${activeTab === "all" ? "active" : ""}`}
          onClick={handleClickAllTodos}
        >
          All
          <span className="count all-todos-count">
            {handleTooMuchTaskCount(todoCounts.all)}
          </span>
        </button>
      </Link>

      <Link to="/">
        <button
          className={`completed ${activeTab === "completed" ? "active" : ""}`}
          onClick={handleClickCompletedTodos}
        >
          Completed
          <span className="count completed-todos-count">
            {handleTooMuchTaskCount(todoCounts.completed)}
          </span>
        </button>
      </Link>

      <Link to="/">
        <button
          className={`uncompleted ${activeTab === "uncompleted" ? "active" : ""}`}
          onClick={handleClickUnfinishedTodos}
        >
          Uncompleted
          <span className="count uncompleted-todos-count">
            {handleTooMuchTaskCount(todoCounts.uncompleted)}
          </span>
        </button>
      </Link>
    </div>
  );
};

export default FilterButtons;

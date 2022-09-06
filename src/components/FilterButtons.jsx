const FilterButtons = ({todos, setTodos}) => { const handleClickAllTodos = () => setTodos(todos);
const handleClickCompletedTodos = () =>
  setTodos(todos.filter((todo) => todo.isCompleted));
const handleClickUnfinishedTodos = () =>
  setTodos(todos.filter((todo) => !todo.isCompleted));

    return (
      <div className="filterButtons">
        <button onClick={handleClickAllTodos}>All Todos</button>
        <button onClick={handleClickCompletedTodos}>Completed Todos</button>
        <button onClick={handleClickUnfinishedTodos}>Unfinished Todos</button>
      </div>
    );
}

export default FilterButtons;
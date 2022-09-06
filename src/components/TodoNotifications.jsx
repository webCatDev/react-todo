const TodoNotifications = ({todos}) => {
    return (
      <div className="todo-notifications">
        {todos.error && <p>{todos.error}</p>}
        {todos.loading && <p>Loading..</p>}
      </div>
    );
}

export default TodoNotifications;
import { getTodos } from "../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import TodoListItem from "./TodoListItem";
import FilterButtons from "./FilterButtons";
import TodoNotifications from "./TodoNotifications";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const [filteredTodos, setFilteredTodos] = useState(todos.data);
  const dispatch = useDispatch();

  useEffect(() => setFilteredTodos(todos.data), [todos.data]);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

 
  return (
    <div className="todoContainer">
      <FilterButtons todos={todos.data} setTodos={setFilteredTodos} />
      <TodoNotifications todos={todos}/>
      <ul>
        {filteredTodos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

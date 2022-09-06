// hooks
import { useDispatch } from "react-redux";
import { useState } from "react";

// action creators
import { deleteTodo } from "../store/todoSlice";

// components
import TodoText from "./TodoText";
import UpdateForm from "./UpdateForm";

const TodoListItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState({ todoId: null, state: false });

  const handleEdit = (id) => setIsEditing(() => ({ state: true, todoId: id }));

  const isEditingCurrentTodo =
    isEditing.state === true && isEditing.todoId === todo.id;

  return (
    <li>
      {isEditingCurrentTodo && (
        <UpdateForm setIsEditing={setIsEditing} todo={todo} />
      )}
      {!isEditingCurrentTodo && <TodoText todo={todo} />}

      <button onClick={() => handleEdit(todo.id)}>Update Todo</button>
      <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete Todo</button>
    </li>
  );
};

export default TodoListItem;

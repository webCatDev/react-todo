// hooks
import { useState } from "react";
import { useDispatch } from "react-redux";

// action creators
import { deleteTodo } from "../store/todoSlice";

// components
import TodoText from "./TodoText";
import UpdateForm from "./UpdateForm";



const TodoListItem = ({ todo, isEditing, setIsEditing }) => {
  const [showFullText, setShowFullText] = useState({
    todoId: null,
    state: false,
  });

  const dispatch = useDispatch();


  const handleEdit = (id) =>
    setIsEditing({ state: !isEditing.state, todoId: id });

  const isEditingCurrentTodo =
    isEditing.state === true && isEditing.todoId === todo.id;

  const isRevealed = showFullText.state && todo.id === showFullText.todoId;

  return (
    <li className="todo-list-item">
      <div className="todo-list-item-info">
        {isEditingCurrentTodo && (
          <UpdateForm setIsEditing={setIsEditing} todo={todo} />
        )}
        {!isEditingCurrentTodo && (
          <TodoText
            showFullText={showFullText}
            setShowFullText={setShowFullText}
            todo={todo}
          />
        )}
        <div>
          <button onClick={() => handleEdit(todo.id)}>{`${
            !isEditingCurrentTodo ? "Edit" : "Cancel"
          }`}</button>
          <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
        </div>
      </div>
      {isRevealed && <p className="todo-description">{todo.content}</p>}
    </li>
  );
};

export default TodoListItem;

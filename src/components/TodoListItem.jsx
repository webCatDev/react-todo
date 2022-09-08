// hooks
import { useDispatch } from "react-redux";

// action creators
import { deleteTodo } from "../store/todoSlice";

// components
import TodoText from "./TodoText";
import UpdateForm from "./UpdateForm";

const TodoListItem = ({ todo, isEditing, setIsEditing }) => {
  const dispatch = useDispatch();
  

  const handleEdit = (id) => setIsEditing({ state: !isEditing.state, todoId: id });

  const isEditingCurrentTodo =
    isEditing.state === true && isEditing.todoId === todo.id;

  return (
    <li>
      {isEditingCurrentTodo && (
        <UpdateForm setIsEditing={setIsEditing} todo={todo} />
      )}
      {!isEditingCurrentTodo && <TodoText todo={todo} />}
      <div>
        <button onClick={() => handleEdit(todo.id)}>{`${!isEditingCurrentTodo ? 'Edit' : 'Cancel'}`}</button>
        <button onClick={() => dispatch(deleteTodo(todo.id))}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoListItem;

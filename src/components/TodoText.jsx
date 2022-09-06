import { updateTodo } from "../store/todoSlice";
import { useDispatch } from "react-redux";
const TodoText = ({ todo }) => {
    const dispatch = useDispatch()
  return (
    <span
      style={{
        textDecoration: `${todo.isCompleted ? "line-through" : ""}`,
      }}
      onClick={() =>
        dispatch(
          updateTodo({
            todoId: todo.id,
            todo: { ...todo, isCompleted: !todo.isCompleted },
          })
        )
      }
    >
      {todo.content}
    </span>
  );
};

export default TodoText;

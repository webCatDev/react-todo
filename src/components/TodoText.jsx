import { updateTodo } from "../store/todoSlice";
import { useDispatch } from "react-redux";

const TodoText = ({ todo, setShowFullText, showFullText}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log('hereeee');
    if (todo.content.length > 13) {
      setShowFullText({state: !showFullText.state, todoId: todo.id})
    }
  };

  return (
    <span
      title="click to reveal long texts && double click for mark as completed/uncompleted"
      onClick={handleClick}
      className="todo-text"
      style={{
        textDecoration: `${todo.isCompleted ? "line-through" : ""}`,
      }}
      onDoubleClick={() =>
        dispatch(
          updateTodo({
            todoId: todo.id,
            todo: { ...todo, isCompleted: !todo.isCompleted },
          })
        )
      }
    >
      {todo.content.length > 13
        ? `${todo.content.slice(0, 13)}... `
        : todo.content}
    </span>
  );
};

export default TodoText;

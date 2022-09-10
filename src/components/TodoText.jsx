import { updateTodo } from '../store/todoSlice';
import { useDispatch } from 'react-redux';
import { TodoTextMaxLength } from '../config';
import DoneIcon from './DoneIcon';
import UndoneIcon from './UndoneIcon';

const TodoText = ({ todo, setShowFullText, showFullText }) => {
  const dispatch = useDispatch();

  const isContentLengthGreaterThanMaxLength =
    todo.content.length > TodoTextMaxLength;
  
  const doneButtonText = todo.isCompleted ? <UndoneIcon /> : <DoneIcon/>;
  const todoText =
   isContentLengthGreaterThanMaxLength
      ? `${todo.content.slice(0, TodoTextMaxLength)}... `
      : todo.content;

  const handleClickTodoText = () => {
    if (isContentLengthGreaterThanMaxLength) {
      setShowFullText({ state: !showFullText.state, todoId: todo.id });
    }
  };

  const handleClickDoneButton = () => dispatch(
            updateTodo({
              todoId: todo.id,
              todo: { ...todo, isCompleted: !todo.isCompleted },
            })
          )

  const label =
    isContentLengthGreaterThanMaxLength && 'click to reveal long texts';

  const completedStyles = {
    textDecoration: `${todo.isCompleted ? 'line-through' : ''}`,
    opacity: `${todo.isCompleted ? 0.5 : 1}`,
  };
  
  return (
    <div className="todo">
      <button className="done-button" onClick={handleClickDoneButton}>
        {doneButtonText}
      </button>

      <span
        title={label}
        aria-label={label}
        onClick={handleClickTodoText}
        className="todo-text"
        style={completedStyles}
      >
        {todoText}
      </span>
    </div>
  );
};

export default TodoText;

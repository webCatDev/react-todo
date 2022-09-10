// hooks
import { useState } from 'react';


// icons

import CancelIcon from './Icons/CancelIcon';
import DeleteIcon from './Icons/DeleteIcon';
import EditIcon from './Icons/EditIcon';

// components
import TodoText from './TodoText';
import AlertDialog from './UI/AlertDialog';
import UpdateForm from './UpdateForm';

const TodoListItem = ({
  todo,
  isEditing,
  setIsEditing,
  checkPageCountOnDelete,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [showFullText, setShowFullText] = useState({
    todoId: null,
    state: false,
  });

  const handleEdit = id =>
    setIsEditing({ state: !isEditing.state, todoId: id });

  const isEditingCurrentTodo =
    isEditing.state === true && isEditing.todoId === todo.id;

  const isRevealed = showFullText.state && todo.id === showFullText.todoId;

  const handleDelete = () => {
    setOpen(true);
  };

  return (
    <li className="todo-list-item">
      <div className="todo-list-item-info">
        {isEditingCurrentTodo ? (
          <UpdateForm setIsEditing={setIsEditing} todo={todo} />
        ) : (
          <TodoText
            showFullText={showFullText}
            setShowFullText={setShowFullText}
            todo={todo}
          />
        )}

        <div>
          <button onClick={() => handleEdit(todo.id)}>
            {!isEditingCurrentTodo ? <EditIcon /> : <CancelIcon />}
          </button>
          <button onClick={() => handleDelete(todo.id)}>
            {<DeleteIcon />}
          </button>
        </div>
        <AlertDialog
          handleClose={handleClose}
          open={open}
          todo={todo}
          checkPageCountOnDelete={checkPageCountOnDelete}
        />
      </div>
      {isRevealed && <p className="todo-description">{todo.content}</p>}
    </li>
  );
};

export default TodoListItem;

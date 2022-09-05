import { List, ListItem, ListItemButton } from "@mui/material";
import { deleteTodo, getTodos, updateTodo } from "../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";


const TodoList = () => {
  const [isEditing, setIsEditing] = useState({ todoId: null, state: false });
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleEdit = (id) => setIsEditing(() => ({ state: true, todoId: id }));

  return (
    <List>
      {todos.error && <p>{todos.error}</p>}
      {todos.loading && <p>Loading..</p>}
      {todos.data.map((todo) => (
        <ListItem key={todo.id}>
          {isEditing.state === true && isEditing.todoId === todo.id ? (
            <form
              onSubmit={(event) => {
                          event.preventDefault();
                          const todoText = event.target.content.value
                          dispatch(
                            updateTodo({
                              todoId: todo.id,
                              todo: { ...todo, content: todoText },
                            })
                          );
                          setIsEditing((prevState) => ({ ...prevState, state: false}));
              }}
            >
              <TextField defaultValue={todo.content} name="content" required />
            </form>
          ) : (
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
          )}
          <ListItemButton onClick={() => handleEdit(todo.id)}>
            Update Todo
          </ListItemButton>
          <ListItemButton onClick={() => dispatch(deleteTodo(todo.id))}>
            Delete Todo
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;

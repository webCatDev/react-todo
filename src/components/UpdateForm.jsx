import { TextField } from "@mui/material";
import { updateTodo } from "../store/todoSlice";
import { useDispatch } from "react-redux";

const UpdateForm = ({ setIsEditing, todo }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const todoText = event.target.content.value;
          dispatch(
            updateTodo({
              todoId: todo.id,
              todo: { ...todo, content: todoText },
            })
          );
          setIsEditing((prevState) => ({ ...prevState, state: false }));
        }}
      >
        <TextField
          defaultValue={todo.content}
          name="content"
          required
          inputProps={{ minLength: 3 }}
        />
      </form>
    </div>
  );
};

export default UpdateForm;

import { addTodo } from "../store/todoSlice";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";

const TodoForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    let todo = event.target.todo.value;
    dispatch(addTodo({ content: todo, isCompleted: false }));
    event.target.todo.value = "";
  };

  return (
    <form
      style={{ wdith: "100%" }}
      className="add-task-form"
      onSubmit={handleSubmit}
    >
      <TextField
        id="standard-basic"
        label="Your Task"
        name="todo"
        variant="standard"
        placeholder="Enter something to do"
        required
        inputProps={{
          minLength: 3,
        }}
        sx={{ width: "100%" }}
      />
    </form>
  );
};

export default TodoForm;

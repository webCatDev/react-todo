import { addTodo } from "../store/todoSlice";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
const uuid = v4;

const TodoForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    let todo = event.target.todo.value;
    dispatch(addTodo({ id: uuid(), content: todo, isCompleted: false }));
    event.target.todo.value = "";
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <TextField
        id="standard-basic"
        label="Your Task"
        name="todo"
        variant="standard"
        placeholder="Enter something to do"
        required
      />
    </form>
  );
};

export default TodoForm;

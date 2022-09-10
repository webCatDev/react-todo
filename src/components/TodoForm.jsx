import { addTodo } from "../store/todoSlice";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlice";
import {useNavigate} from 'react-router-dom'

const TodoForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    let todo = event.target.todo.value;
    dispatch(addTodo({ content: todo, isCompleted: false }));
    event.target.todo.value = "";
    dispatch(uiActions.changeActiveTab('all'))
    navigate('/?page=1')
  };

  return (
    <form
      style={{ width: "100%" }}
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

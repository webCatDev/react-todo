import { addTodo } from "../store/todoSlice";
import { OutlinedInput, InputAdornment } from "@mui/material";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlice";
import {useNavigate} from 'react-router-dom'
import SubmitIcon from "./Icons/SubmitIcon";
import { useState } from "react";

const TodoForm = () => {
  const [error, setError] = useState(true)
  const [touched, setTouched] = useState(false)

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

  const handleFocus = () => setTouched(true)
  const handleBlur = () => setTouched(false)
  const handleOnchange = ({target:{value}}) => value.trim().length < 3 ? setError(true) : setError(false)

  return (
    <form
      style={{ width: '100%' }}
      className="add-task-form"
      onSubmit={handleSubmit}
    >
      <OutlinedInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleOnchange}
        error={touched && error ? true : false} 
        id="standard-basic"
        name="todo"
        variant="standard"
        placeholder="Enter something to do"
        required
        inputProps={{
          minLength: 3,
          'aria-label': 'your name',
        }}
        endAdornment={
          <InputAdornment position="end">
            <button>
              <SubmitIcon />
            </button>
          </InputAdornment>
        }

        sx={{ width: '100%' }}
      />
    </form>
  );
};

export default TodoForm;

import {  OutlinedInput, InputAdornment } from "@mui/material";
import { updateTodo } from "../store/todoSlice";
import { useDispatch } from "react-redux";
import SubmitIcon from "./Icons/SubmitIcon";
import { useState } from "react";

const UpdateForm = ({ setIsEditing, todo }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(true);
  const [touched, setTouched] = useState(false);

  const handleFocus = () => setTouched(true);
  const handleBlur = () => setTouched(false);
  const handleOnchange = ({ target: { value } }) =>
    value.trim().length < 3 ? setError(true) : setError(false);

  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          const todoText = event.target.content.value;
          dispatch(
            updateTodo({
              todoId: todo.id,
              todo: { ...todo, content: todoText },
            })
          );
          setIsEditing(prevState => ({ ...prevState, state: false }));
        }}
      >
        <OutlinedInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleOnchange}
          error={touched && error ? true : false}
          endAdornment={
            <InputAdornment position="end">
              <button>
                <SubmitIcon />
              </button>
            </InputAdornment>
          }
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

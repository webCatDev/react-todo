import {  OutlinedInput, InputAdornment } from "@mui/material";
import { updateTodo } from "../store/todoSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ConfirmIcon from "./Icons/ConfirmIcon";

const UpdateForm = ({ setIsEditing, todo }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(true);
  const [touched, setTouched] = useState(false);

  
  const handleBlur = () => setTouched(false);
   const handleOnchange = ({ target: { value } }) => {
     if (!value.trim()) {
       return;
     }
     value.length > 0 ? setTouched(true) : setTouched(false);

     value.length < 3 ? setError(true) : setError(false);
   };

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
          onBlur={handleBlur}
          onChange={handleOnchange}
          error={touched && error ? true : false}
          endAdornment={
            <InputAdornment position="end">
              <button>
                <ConfirmIcon />
              </button>
            </InputAdornment>
          }
          defaultValue={todo.content}
          name="content"
          required
          inputProps={{ minLength: 3,  'aria-label': 'edit task'}}
        />
      </form>
    </div>
  );
};

export default UpdateForm;

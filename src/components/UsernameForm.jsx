import SubmitIcon from './Icons/SubmitIcon';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { useState } from 'react';

const UsernameForm = ({ username, setUsername }) => {
  const [error, setError] = useState(true);
  const [touched, setTouched] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    function Normalize(str) {
      return str[0].toLocaleUpperCase() + str.slice(1).toLocaleLowerCase()
    } 

    const username = Normalize(event.target.username.value)
    setUsername(username);
    localStorage.setItem('username', username);
  };

  
  const handleBlur = () => setTouched(false);
  const handleOnchange = ({ target: { value } }) => {
    if (!value.trim()) {
      return;
    }
    value.length > 0 ? setTouched(true): setTouched(false)

    value.length < 3 ? setError(true) : setError(false);
  }

  return (
    <form
      className="username-form"
      style={{ width: '90%', marginBottom: '1rem' }}
      onSubmit={handleSubmit}
    >
      <OutlinedInput
        id="name"
        onBlur={handleBlur}
        onChange={handleOnchange}
        error={touched && error ? true : false}
        name="username"
        type="text"
        defaultValue={username}
        inputProps={{ minLength: 3, maxLength: 11, 'aria-label': 'your name' }}
        endAdornment={
          <InputAdornment position="end">
            <button>
              <SubmitIcon />
            </button>
          </InputAdornment>
        }
        required
        placeholder="Enter your name"
        sx={{ width: '100%' }}
      />
    </form>
  );
};

export default UsernameForm;

import {TextField} from "@mui/material"

const UsernameForm = ({username, setUsername}) => {
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const username = event.target.username.value;
    setUsername(username)
    localStorage.setItem("username", username);
  };

  return (
    <form
    style={{width: '100%'}}  onSubmit={handleSubmit}>
      <TextField
        id="name"
        label="Your Name"
        name="username"
        type="text"
        defaultValue={username}
        inputProps={{ maxLength: 12 }}
        required
        placeholder="Please enter your name"
        
        sx={{ width: "100%" }}
      />
    </form>
  );
};

export default UsernameForm;

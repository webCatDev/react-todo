const UsernameForm = () => {
    return (
      <form>
        <label htmlFor="name">Name*</label>
        <input
          id="name"
          type="text"
          required
          placeholder="Please enter your name"
        />
      </form>
    );
}

export default UsernameForm;
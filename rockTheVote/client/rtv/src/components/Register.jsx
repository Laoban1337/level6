import React from "react";

export default function Register(props) {
  const {
    handleChange,
    handleSubmit,
    btnText,
    errMsg,
    inputs: { username, password },
  } = props;
  console.log("username: ", username);
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="text"
        value={password}
        name="password"
        onChange={handleChange}
        placeholder="Password"
      />
      <button>{btnText}</button>
      <p style={{ color: "red" }}>{errMsg}</p>
    </form>
  );
}

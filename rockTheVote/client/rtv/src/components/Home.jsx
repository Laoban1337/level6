import React, { useState, useContext } from "react";
import Login from "./Profile.jsx";
import Register from "../components/Register.jsx";
import { UserContext } from "../context/UserProvider.jsx";



export default function Home() {
  const initInputs = { username: "", password: "" };
  const [inputs, setInputs] = useState(initInputs);
  const [formToggle, setFormToggle] = useState(false);

  const { signup, login, errMsg } = useContext(UserContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }))
    console.log(`input ${name}`,value)
  }

  function handleSignup(e) {
    e.preventDefault();
    signup(inputs);
  }

  function handleLogin(e) {
    e.preventDefault();
    login(inputs);
  }

  function toggleForm() {
    setFormToggle((prev) => !prev);
    // Assuming resetAuthErr is a function in your context to clear error messages
    // if (typeof resetAuthErr === 'function') {
    //   resetAuthErr();
    // }
  }

  return (
    <div className="auth-container">
      <h1>Message Board</h1>
      {!formToggle ? (
        <>
          <Register
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg}
          />
          <p onClick={toggleForm}>Already a member?</p>
        </>
      ) : (
        <>
          <Register
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
          />
          <p onClick={toggleForm}>Not a member?</p>
        </>
      )}
    </div>
  );
}

import React, { useState,useContext } from "react";
import { UserContext } from "../context/UserProvider";

const RegisterForm = () => {
  const { signup, login } = useContext(UserContext);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [formToggle, setFormToggle] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });

  const onSubmit = (event) => {
    event.preventDefault();
    if (!formToggle) {
      // Sign up
      if (validateForm()) {
        signup(formData);
      }
    } else {
      // Login
      if (validateForm()) {
        login(formData);
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: '', password: '' };

    if (!formData.username.trim()) {
      newErrors.username = 'Name is required';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const toggleForm = () => {
    setFormToggle((prevToggle) => !prevToggle);
    setFormData({ username: '', password: '' });
    setErrors({ username: '', password: '' });
  };

  return (
    <div className="auth-container">
      <h1 className="choreBoar">Chore Boar</h1>
      <img src="/choreboar.jpg" alt="" className="choreboar" />
      {!formToggle ? (
        <>
          <form onSubmit={onSubmit} className="regForm">
            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p>{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>

            <button type="submit">Sign up</button>
          </form>
          <p onClick={toggleForm}>Already a member?</p>
        </>
      ) : (
        <>
          <form onSubmit={onSubmit} className="regForm">
            <div>
              <label htmlFor="username">Name</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p>{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>

            <button type="submit">Login</button>
          </form>
          <p onClick={toggleForm}>Not a member?</p>
        </>
      )}
    </div>
  );
};

export default RegisterForm;

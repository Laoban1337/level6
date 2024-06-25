import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import ChoreForm from "./ChoreForm";
import ChoreList from "./ChoreList";
export default function Profile() {
  const {
    user: { username, _id },
    choreState,
    chores,
    getAllChores,
    getUserChores,
  } = useContext(UserContext);

  useEffect(() => {
    getAllChores();
    getUserChores(_id);
  }, []);

  return (
    <div className="profile-container">
      <div className="logo">
        <img
          src="/choreboarLogo.jpg"
          alt="chore Boar logo"
          className="public"
        />
      </div>
      <h1>Welcome {username}!</h1>
      <h2>Profile Page</h2>
      <img src="mowlawn.jpg" alt="Profile Picture" className="profile" />
      <h3> Add a Chore</h3>
      <ChoreForm />
      <h4>Your Chore List</h4>
      <ChoreList chores={chores} {...choreState} username={username} />
    </div>
  );
}

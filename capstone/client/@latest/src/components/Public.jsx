import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import ChoreList from "./ChoreList";

export default function Public() {
  const { getAllChores, getUserChores, choreState,
    chores,} = useContext(UserContext);

  useEffect(() => {
    getAllChores();
    getUserChores();
  }, []);
console.log("Public",choreState)
  return (
    <div className="public">
      <h1>Public!</h1>
      <div className="logo">
        <img src="/choreboarLogo.jpg" alt="chore Boar logo" className="public" />
      </div>
      <div className="coreList">
        <ChoreList chores={choreState} {...choreState}/>
      </div>
      
   
    </div>
  );
}

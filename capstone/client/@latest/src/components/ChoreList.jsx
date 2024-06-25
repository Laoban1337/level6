import React from "react";
import ChoreDetail from "./ChoreDetail";

export default function ChoreList({chores,username}) {
  // const {chores}=props
 
  console.log("Chores",chores," chore list username:",username); // Log chores for debugging purposes

  return (
    <div className="chore-list">

      {/* {chores &&
        chores.map((chore) => <ChoreDetail key={chore._id} {...chore} />)} */}

        {chores? 
        chores.map((chore) => <ChoreDetail key={chore._id} {...chore} username={username}/>) 
        : 
        <h5>There are no chores to see here!</h5>}
    </div>
  );
}

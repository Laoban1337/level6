import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider.jsx";
import AddIssue from "./AddIssue.jsx";
import IssueList from "./IssueList.jsx";

export default function Profile() {
  const {
    user: { username },
    addIssue,
    issues,
    getUserIssues,
    getAllComments
  } = useContext(UserContext);

  useEffect(() => {
    getUserIssues();
    getAllComments();
  }, []);

  // console.log(issues);

  return (
    <div className="login">
      <h1>Welcome @{username}!</h1>
      <h2>Profile Page</h2>
      <h3>Add an issue</h3>
      <AddIssue addIssue={addIssue} />
      <h3>Your Issues</h3>
      <IssueList issues={issues} />
    </div>
  );
}

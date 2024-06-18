import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import IssueList from "./IssueList";

export default function Public() {
  const {getAllIssues, allIssues,getAllComments,allComments,upVoteIssue,downVoteIssue} = useContext(UserContext)

  useEffect(() => {
    getAllIssues()
    getAllComments()
    
  }, [])
//  console.log("allIssues",allIssues)
console.log("all Comments",allComments)

  return (
    <div className="public">
      <h1>All Issues!</h1>
      <IssueList issues={allIssues} upVoteIssue={upVoteIssue} downVoteIssue={downVoteIssue} />
    </div>
  );
}

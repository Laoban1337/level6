import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import CommentContainer from "./CommentContainer";

export default function IssueDetail(props) {
  const { editIssues, deleteIssues, upVoteIssue, downVoteIssue, allIssues } =
    useContext(UserContext);
  const { title, description, imgUrl, _id, username, likedUser, disLikedUser,} =
    props;

  console.log("userNameTest", username);
  console.log("all issues: ", allIssues);
  

  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    const updatedIssueData = {
      title: updatedTitle,
      description: updatedDescription,
      // imgUrl: imgUrl,  imgUrl remains unchanged
    };

    editIssues(_id, updatedIssueData);
    setIsEditing(false); // After editing, reset to view mode
  };

  const handleCancelEdit = () => {
    // Reset fields to their original values
    setUpdatedTitle(title);
    setUpdatedDescription(description);
    setIsEditing(false);
  };


  
  const toggleEdit = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setUpdatedDescription(e.target.value);
  };

  return (
    <div className="issueDetail">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedTitle}
            onChange={handleTitleChange}
          />
          <textarea
            value={updatedDescription}
            onChange={handleDescriptionChange}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <h1>{title}</h1>

          <h3>{description}</h3>
          <img src={imgUrl} alt={imgUrl} width={400} />
          <p>posted by {username}</p>
          <div>
            <p>Upvotes: {likedUser.length}</p>
            <button onClick={() => upVoteIssue(_id)}>Upvote</button>
          </div>

          <div>
            <p>Downvotes: {disLikedUser.length}</p>
            <button onClick={() => downVoteIssue(_id)}> Downvote</button>
          </div>
          <div className="button-container">
            <button onClick={toggleEdit}>Edit</button>
            <button onClick={() => deleteIssues(_id)}>Delete</button> 
            <button onClick={() => upVoteIssue(_id)}>Upvote</button>
            <button onClick={() => downVoteIssue(_id)}>Downvote</button>
          </div>
          <CommentContainer issueId={_id} username={username} />
        </>
      )}
    </div>
  );
}

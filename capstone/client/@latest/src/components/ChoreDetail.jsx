import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

export default function ChoreDetail(props) {
  const {  editChores, deleteChore, user } = useContext(UserContext);

  const { choreName, choreTime, choreImg, _id, username,user:userId,userName } = props;
  console.log("username",username)

  const [updatedChoreName, setUpdatedChoreName] = useState(choreName);
  const [updatedChoreTime, setUpdatedChoreTime] = useState(choreTime);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    const updatedChoreData = {
      choreName: updatedChoreName,
      choreTime: updatedChoreTime,
    };
    editChores(_id, updatedChoreData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setUpdatedChoreName(choreName);
    setUpdatedChoreTime(choreTime);
    setIsEditing(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChoreNameChange = (e) => {
    setUpdatedChoreName(e.target.value);
  };

  const handleChoreTimeChange = (e) => {
    setUpdatedChoreTime(e.target.value);
  };

  console.log(user)
//   console.log(userState)

  return (
    <div className="choreDetail">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedChoreName}
            onChange={handleChoreNameChange}
          />
          <textarea value={updatedChoreTime} onChange={handleChoreTimeChange} />
          <button onClick={handleEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <h1 className="choreName">{choreName}</h1>

          <h3>{choreTime}</h3>
          <img src={choreImg} alt={choreImg} width={400} className="choreImg" />
          <p>posted by {userName}</p>
          {/* <div>
            <p>Upvotes: {likedUser.length}</p>
            <button onClick={() => upVoteIssue(_id)}>Upvote</button>
          </div>

          <div>
            <p>Downvotes: {disLikedUser.length}</p>
            <button onClick={() => downVoteIssue(_id)}> Downvote</button>
          </div> */}
          {user._id === userId && (
            <div className="button-container">
              <button onClick={toggleEdit}>Edit</button>
              <button onClick={() => deleteChore(_id)}>Delete</button>
            </div>
          )}
          {/* <CommentContainer issueId={_id} username={username} /> */}
        </>
      )}
    </div>
  );
}

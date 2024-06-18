import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

function CommentList(props) {
  const { issueId } = props;
  const { allComments } = useContext(UserContext);
  const fillteredComments = allComments.filter(
    (comment) => comment.issue === issueId
  );
 

  const commentElements = fillteredComments.map((comment) => {
    return (
      <>
        <p>{comment.text}</p>
        <p>{comment.username} </p>
      </>
    );
  });
  return <div>{commentElements}</div>;
}

export default CommentList;

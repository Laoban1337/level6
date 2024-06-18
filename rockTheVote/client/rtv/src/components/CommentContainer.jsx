import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function CommentContainer(props) {
  const { issueId } = props;

  const [isHidden, setIsHidden] = useState(true);

  function toggleView() {
    setIsHidden(!isHidden);
  }

  return (
    <div>
      <CommentForm issueId={issueId} />
      <button onClick={toggleView}>
        {isHidden ? "Show Comments" : "Hide Comments"}
      </button>
      {!isHidden && <CommentList issueId={issueId} />}
    </div>
  );
}

export default CommentContainer;

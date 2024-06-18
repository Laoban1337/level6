import { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";

function CommentForm(props) {
  const { addComment } = useContext(UserContext);

  const { issueId } = props;

  const [formData, setFormData] = useState({
    text: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addComment(issueId, formData);
    setFormData({ text: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Comment"
        name="text"
        value={formData.text}
        onChange={handleChange}
      />
      <button>Leave Comment</button>
    </form>
  );
}

export default CommentForm;

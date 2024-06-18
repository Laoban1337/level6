import React, {useContext,useState} from "react";
import { UserContext } from "../context/UserProvider";

export default function EditForm({ issue, closeForm }) {
  const { editIssues } = useContext(UserContext);
  const initState = { title: issue.title, description: issue.description };
  const [editFormData, setEditFormData] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editIssues(issue._id, editFormData);
    // closeForm();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={editFormData.title}
          onChange={handleChange}
        />
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={editFormData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={closeForm}>Cancel</button>
      </form>
    </div>
  );
}

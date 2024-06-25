import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import ChoreList from "./ChoreList"

export default function ChoreForm() {
  const { addChore } = useContext(UserContext);
  const [choreData, setChoreData] = useState({
    choreName: "",
    choreTime: "",
    choreImg: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setChoreData({ ...choreData, [id]: value });
  };

  const onSubmitSignup = (event) => {
    event.preventDefault();
    addChore(choreData);
    reset(); // Assuming reset() would reset the form fields
  };

  const reset = () => {
    setChoreData({
      choreName: "",
      choreTime: "",
      choreImg: "",
    });
  };

  return (
    <form className="choreForm" onSubmit={onSubmitSignup}>
      <div>
        <label htmlFor="choreName">Chore Name</label>
        <input
          type="text"
          id="choreName"
          name="choreName"
          value={choreData.choreName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="choreTime">Chore Time (Minutes)</label>
        <input
          type="number"
          id="choreTime"
          name="choreTime"
          value={choreData.choreTime}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="choreImg">Chore Image URL</label>
        <input
          type="text"
          id="choreImg"
          name="choreImg"
          value={choreData.choreImg}
          onChange={handleChange}
        />
        <ChoreList/>
      </div>

      <button type="submit">Submit</button>
    </form>
    
  );
}

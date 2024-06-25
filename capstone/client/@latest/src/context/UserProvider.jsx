import React, { useState } from "react";
import axios from "axios";

export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// function parseUser(user) {
//   try {
//     return JSON.parse(user) || {};
//   } catch (e) {
//     console.error("Error parsing user from localStorage", e);
//     return {};
//   }
// }

export default function UserProvider(props) {
  const userFromStorage = localStorage.getItem("user");

  console.log("user from local storage", userFromStorage);

  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    chores: [],
    errMsg: "",
  };

  const [userState, setUserState] = useState(initState);
  const [choreState, setChoreState] = useState([]);
  // const [allComments, setAllComments] = useState([]);

  function signup(credentials) {
    console.log("Signing up with credentials:", credentials);

    axios
      .post("/api/auth/signup", credentials)
      .then((res) => {
        const { user, token } = res.data;
        console.log("response data", res.data);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setUserState((prevState) => ({ ...prevState, user, token }));

        console.log("Signup successful, token:", token);
      })
      .catch((err) => {
        console.log("Signup error", err);
      });
  }

  function login(credentials) {
    axios
      .post("/api/auth/login", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState((prevUserState) => ({ ...prevUserState, user, token }));
        getAllChores();
      })
      .catch((err) => {
        console.log("Login Error:", err);
        handleAuthError(err.response.data.errMsg);
      });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState({ user: {}, token: "", chores: [] });
  }

  // Get all chores
  async function getAllChores() {
    try {
      const res = await userAxios.get("/api/main/chore");
      setChoreState(res.data);
    } catch (error) {
      console.error("Error fetching chore data", error);
    }
  }

  function getUserChores() {
    userAxios
      .get(`/api/main/chore/user`)
      .then((res) => {
        setUserState((prevState) => ({ ...prevState, chores: res.data }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Add chore
  function addChore(newChore) {
    userAxios
      .post(`/api/main/chore/`, newChore)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          chores: [...prevState.chores, res.data],
        }));
      })
      .catch((err) => {
        console.error("There was an issue adding your new chore", err);
        
      });
  }

  //Adds chore to a specific user profile? {Admin use in the future}
  // function addChoreToUser(newChore) {
    
  //   userAxios.post(`/api/main/chore/user/${newChore.username}`, newChore)
  //     .then((res) => {
      
  //       setUserState((prevState) => ({
  //         ...prevState,
  //         chores: [...prevState.chores, res.data],
  //       }));
  //     })
  //     .catch((err) => {
  //       console.error("There was an issue adding your new chore", err);
  //       if (err.response) {
  //         console.log(err.response.data.errMsg);
  //       } else {
  //         console.log("Error:", err.message);
  //       }
  //     });
  // }
  

  // Delete chore
  function deleteChore(choreId) {
    userAxios.delete(`/api/main/chore/${choreId}`).then(() => {
      setUserState((prevState) => ({
        ...prevState,
        chores: prevState.chores.filter((chore) => chore._id !== choreId),
      }));
    });
  }

  // Edit chores
  function editChores(choreId, updateChoreData) {
    userAxios.put(`/api/main/chore/${choreId}`, updateChoreData).then((res) => {
      const updatedChore = res.data;
      setUserState((prevState) => ({
        ...prevState,
        chores: prevState.chores.map((chore) =>
          chore._id === choreId ? updatedChore : chore
        ),
      }));
    });
  }

  // Auth error handler
  function handleAuthError(errMsg) {
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        choreState,
        signup,
        login,
        logout,
        addChore,
        // addChoreToUser,
        editChores,
        deleteChore,
        getAllChores,
        getUserChores,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

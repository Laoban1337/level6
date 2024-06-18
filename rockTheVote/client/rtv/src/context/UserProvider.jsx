import React, { useState, useEffect } from "react";
import axios from "axios";

export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function parseUser(user) {
  try {
    return JSON.parse(user) || {};
  } catch (e) {
    console.error("Error parsing user from localStorage", e);
    return {};
  }
}

export default function UserProvider(props) {
  const userFromStorage = localStorage.getItem("user");
  console.log("user from local storage", userFromStorage);

  const initState = {
    user: parseUser(userFromStorage),
    token: localStorage.getItem("token") || "",
    issues: [],
    errMsg: "",
    allUsersAndIssues: [],
  };

  const [userState, setUserState] = useState(initState);
  const [allIssues, setAllIssues] = useState([]);
  const [allComments, setAllComments] = useState([]);

  function signup(credentials) {
    axios
      .post("/auth/signup", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState((prevState) => ({ ...prevState, user, token }));
      })
      .catch((err) => {
        console.log("Signup error:", err);
        handleAuthError(err.response.data.errMsg);
      });
  }

  function login(credentials) {
    userAxios
      .post("/auth/login", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        getUserIssues();
        setUserState((prevUserState) => ({ ...prevUserState, user, token }));
      })
      .catch((err) => {
        console.error("Login error:", err);
        handleAuthError(err.response.data.errMsg);
      });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState({ user: {}, token: "", issues: [] });
  }

  function getUserIssues() {
    userAxios
      .get("/api/main/issue/user")
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function getAllUsersAndIssues() {
    userAxios
      .get("/api/main/users")
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          allUsersAndIssues: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  async function getAllIssues() {
    try {
      const res = await userAxios.get("/api/main/issue");
      setAllIssues(res.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  }

  async function getAllComments() {
    try {
      const res = await userAxios.get(`/api/main/comments`);
      setAllComments(res.data);
    } catch (error) {
      console.error(`Error fetching Comments ${error}`);
    }
  }

  function deleteIssues(issueID) {
    userAxios.delete(`/api/main/issue/${issueID}`).then(() => {
      setUserState((prevState) => ({
        ...prevState,
        issues: prevState.issues.filter((issue) => issue._id !== issueID),
      }));
    });
  }

  function editIssues(issueID, updatedIssueData) {
    userAxios
      .put(`/api/main/issue/${issueID}`, updatedIssueData)
      .then((res) => {
        const updatedIssue = res.data;
        setUserState((prevState) => ({
          ...prevState,
          issues: prevState.issues.map((issue) =>
            issue._id === issueID ? updatedIssue : issue
          ),
        }));
      });
  }

  function handleAuthError(errMsg) {
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }

  function addIssue(newIssue) {
    userAxios
      .post("/api/main/issue", newIssue)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: [...prevState.issues, res.data],
        }));
      })
      .catch((err) => {
        console.error("Add Issue error:", err);
        console.log(err.response.data.errMsg);
      });
  }

  // function upKeepIssues(){
  //   getUserIssues();
  //    getAllIssues()

  // }

  function upVoteIssue(issueId) {
    console.log("Upvoting issue with ID:", issueId);
    userAxios
      .put(`/api/main/issue/upVote/${issueId}`)
      .then((res) => {
        if (!res.data) {
          throw new Error("No data returned from the server");
        }
        console.log("Response data:", res.data);

        setAllIssues((prevIssues) =>
          prevIssues.map((issue) => (issue._id === issueId ? res.data : issue))
        );

        setUserState((prevUserState) => ({
          ...prevUserState,
          issues: prevUserState.issues.map((issue) =>
            issue._id === issueId ? res.data : issue
          ),
        }));
      })
      .catch((err) => {
        console.error("Error upvoting issue:", err);
      });
  }

  function downVoteIssue(issueId) {
    userAxios
      .put(`/api/main/issue/downVote/${issueId}`)
      .then((res) => {
        setAllIssues((prevIssues) =>
          prevIssues.map((issue) => (issue._id === issueId ? res.data : issue))
        );
        setUserState((prevUserState) => {
          return {
            ...prevUserState,
            issues: prevUserState.issues.map((issue) =>
              issueId === issue._id ? res.data : issue
            ),
          };
        });
      })
      .catch((err) => console.log(err));
  }
  function addComment(id, comment) {
    userAxios
      .post(`/api/main/comments/${id}`, comment)
      .then((res) =>
        setAllComments((prevAllComment) => {
          return [...prevAllComment, res.data];
        })
      )
      .catch((err) => console.error(err));
  }

  // useEffect(() => {
  //   getUserIssues();
  // }, []);

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addIssue,
        deleteIssues,
        getUserIssues,
        editIssues,
        getAllUsersAndIssues,
        upVoteIssue,
        downVoteIssue,
        getAllIssues,
        allIssues,
        getAllComments,
        allComments,
        addComment,
        // upKeepIssues,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

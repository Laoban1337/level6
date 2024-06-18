import React from "react";

export default function UserWithIssues({ user }) {
  return (
    <div>
      <h2>{user.username}</h2>
      <ul>
        {user.issues.map((issue) => (
          <li key={issue._id}>{issue.title}</li>
        ))}
      </ul>
    </div>
  );
}

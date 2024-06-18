import React from 'react';
import IssueDetail from './IssueDetail';

export default function IssueList({ issues }) {
  console.log(issues); // Log issues for debugging purposes
  
  return (
    <div className="issue-list">
      { issues && issues.map(issue => (
        <IssueDetail key={issue._id} {...issue} />
      ))}
    </div>
  );
}

import React from 'react';
import './EmailList.css';

const emails = [
  { name: 'Hannah Morgan', msg: 'Meeting scheduled', time: '1:24 PM' },
  { name: 'Megan Clark', msg: 'Update on marketing campaign', time: '12:32 PM' },
  { name: 'Brandon Williams', msg: 'Designly 2.0 is about to launch', time: 'Yesterday 8:57 PM' },
  { name: 'Reid Smith', msg: 'My friend Julie loves Dappr!', time: 'Yesterday 8:49 PM' },
];

const EmailList = () => (
  <div className="recent-emails">
    <p>Recent emails</p>
    <ul>
      {emails.map((email, index) => (
        <li key={index}>
          <strong>{email.name}</strong> – {email.msg} <span>{email.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default EmailList;

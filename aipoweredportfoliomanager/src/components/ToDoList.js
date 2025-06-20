import React from 'react';
import './TodoList.css';

const todos = [
  { task: 'Run payroll', time: 'Mar 4 at 6:00 pm' },
  { task: 'Review time off request', time: 'Mar 7 at 6:00 pm' },
  { task: 'Sign board resolution', time: 'Mar 12 at 6:00 pm' },
  { task: 'Finish onboarding Tony', time: 'Mar 12 at 6:00 pm' },
];

const TodoList = () => (
  <div className="todo-list">
    <p>Your to-Do list</p>
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo.task} <span>{todo.time}</span></li>
      ))}
    </ul>
  </div>
);

export default TodoList;

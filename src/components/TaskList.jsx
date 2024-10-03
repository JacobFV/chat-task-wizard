import React from 'react';
import { useTaskContext } from '../contexts/TaskContext';

const TaskList = () => {
  const { tasks } = useTaskContext();

  return (
    <div className="bg-gray-100 p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Active Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="bg-white p-2 rounded shadow">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">
              Status: {task.readyForInput ? 'Ready for Input' : task.readyForOutput ? 'Ready for Output' : 'Processing'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
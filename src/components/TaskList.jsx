import React from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import ExpandedTaskView from './ExpandedTaskView';

const TaskList = () => {
  const { tasks, expandedTaskId, toggleTaskExpansion } = useTaskContext();

  return (
    <div className="bg-white/30 backdrop-blur-md p-4 h-screen overflow-y-auto rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Active Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="bg-white/50 p-2 rounded shadow transition-all duration-300 hover:shadow-md">
            <div
              className="cursor-pointer"
              onClick={() => toggleTaskExpansion(task.id)}
            >
              <h3 className="font-semibold text-gray-800">{task.title}</h3>
              <p className="text-sm text-gray-600">
                Status: {task.readyForInput ? 'Ready for Input' : task.readyForOutput ? 'Ready for Output' : 'Processing'}
              </p>
            </div>
            {expandedTaskId === task.id && <ExpandedTaskView task={task} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
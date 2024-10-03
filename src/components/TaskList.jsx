import React from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import ExpandedTaskView from './ExpandedTaskView';

const TaskList = () => {
  const taskContext = useTaskContext();
  
  // Check if taskContext is undefined or null
  if (!taskContext) {
    return <div>Loading tasks...</div>;
  }

  const { tasks, expandedTaskId, toggleTaskExpansion } = taskContext;

  return (
    <div className="bg-gray-900/50 backdrop-blur-md p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-200">Active Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="bg-gray-800/50 p-2 rounded shadow transition-all duration-300 hover:shadow-md">
            <div
              className="cursor-pointer"
              onClick={() => toggleTaskExpansion(task.id)}
            >
              <h3 className="font-semibold text-gray-200">{task.title}</h3>
              <p className="text-sm text-gray-400">
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
import React from 'react';
import { Link } from 'react-router-dom';

const ExpandedTaskView = ({ task }) => {
  const truncateMessage = (message, maxLength = 100) => {
    if (message.length <= maxLength) return message;
    return message.substr(0, maxLength - 3) + '...';
  };

  return (
    <div className="mt-2 p-2 bg-gray-700/50 rounded">
      <p className="text-sm text-gray-300 mb-2">{task.description}</p>
      <p className="text-xs text-gray-400">
        Context: <Link to={`/conversation/${task.context.split(' ')[1]}`} className="text-blue-300 hover:text-blue-200 underline">
          {truncateMessage(task.contextMessage)}
        </Link>
      </p>
    </div>
  );
};

export default ExpandedTaskView;
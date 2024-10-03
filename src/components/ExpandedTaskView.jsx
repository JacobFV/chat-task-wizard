import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExpandedTaskView = ({ task }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Assuming the conversation routes are set up as '/conversation/:id'
    navigate(`/conversation/${task.context.split(' ')[1]}`);
  };

  return (
    <div className="mt-2 p-2 bg-white/70 rounded">
      <p className="text-sm text-gray-700">{task.description}</p>
      <button
        onClick={handleNavigate}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Go to Conversation
      </button>
    </div>
  );
};

export default ExpandedTaskView;
import React from 'react';
import { addMessage } from '../utils/messageLog';

const ConversationView = ({ conversation }) => {
  const handleNewMessage = (newMessage) => {
    addMessage(newMessage);
    // Add logic here to update the conversation state
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-md p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-200">{conversation.title}</h2>
      <div className="space-y-4">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={`p-2 rounded ${
              message.author === 'user' ? 'bg-gray-700/50 text-right' : 'bg-gray-800/50'
            }`}
          >
            <p>{message.content}</p>
            <small className="text-gray-400">
              {new Date(message.timestamp).toLocaleString()} - Read by: {message.readByIds.length}
            </small>
          </div>
        ))}
      </div>
      {/* Add a form or input field here to send new messages */}
    </div>
  );
};

export default ConversationView;
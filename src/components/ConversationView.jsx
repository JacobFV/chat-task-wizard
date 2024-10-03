import React from 'react';

const ConversationView = ({ conversation }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-md p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-200">{conversation.title}</h2>
      <div className="space-y-4">
        {conversation.messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              message.sender === 'user' ? 'bg-gray-700/50 text-right' : 'bg-gray-800/50'
            }`}
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationView;
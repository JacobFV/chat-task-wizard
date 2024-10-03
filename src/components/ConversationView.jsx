import React from 'react';

const ConversationView = ({ conversation }) => {
  return (
    <div className="bg-white p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">{conversation.title}</h2>
      <div className="space-y-4">
        {conversation.messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              message.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100'
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
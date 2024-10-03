import React from 'react';

const ConversationList = ({ conversations, activeConversation, setActiveConversation }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-md p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-200">Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className={`cursor-pointer p-2 mb-2 rounded transition-all duration-300 ${
              activeConversation.id === conversation.id ? 'bg-gray-700/50 shadow-md' : 'hover:bg-gray-800/50'
            }`}
            onClick={() => setActiveConversation(conversation)}
          >
            {conversation.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
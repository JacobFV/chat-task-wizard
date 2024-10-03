import React from 'react';

const ConversationList = ({ conversations, activeConversation, setActiveConversation }) => {
  return (
    <div className="bg-white/30 backdrop-blur-md p-4 h-screen overflow-y-auto rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className={`cursor-pointer p-2 mb-2 rounded transition-all duration-300 ${
              activeConversation.id === conversation.id ? 'bg-white/50 shadow-md' : 'hover:bg-white/40'
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
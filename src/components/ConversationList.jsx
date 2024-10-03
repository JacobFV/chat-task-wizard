import React from 'react';

const ConversationList = ({ conversations, activeConversation, setActiveConversation }) => {
  return (
    <div className="bg-gray-100 p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className={`cursor-pointer p-2 mb-2 rounded ${
              activeConversation.id === conversation.id ? 'bg-blue-200' : 'hover:bg-gray-200'
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
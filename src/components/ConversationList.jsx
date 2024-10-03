import React from 'react';
import { MessageSquareIcon } from 'lucide-react';

const ConversationList = ({ conversations, activeConversation, setActiveConversation }) => {
  // Sort conversations to put the active one at the top
  const sortedConversations = [...conversations].sort((a, b) => {
    if (a.id === activeConversation.id) return -1;
    if (b.id === activeConversation.id) return 1;
    return 0;
  });

  return (
    <div className="bg-gray-900/50 backdrop-blur-md p-4 h-screen overflow-y-auto">
      <ul>
        {sortedConversations.map((conversation) => (
          <li
            key={conversation.id}
            className={`cursor-pointer p-2 mb-2 rounded transition-all duration-300 flex items-center ${
              activeConversation.id === conversation.id ? 'bg-gray-700/50 shadow-md' : 'hover:bg-gray-800/50'
            }`}
            onClick={() => setActiveConversation(conversation)}
          >
            <MessageSquareIcon className="h-5 w-5 mr-2" />
            <span>{conversation.title}</span>
            {conversation.hasUnread && (
              <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
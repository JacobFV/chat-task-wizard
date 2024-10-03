import React, { useState } from 'react';
import ConversationList from '../components/ConversationList';
import ConversationView from '../components/ConversationView';
import TaskList from '../components/TaskList';
import { TaskProvider } from '../contexts/TaskContext';

const Index = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: 'Conversation 1',
      messages: [
        { sender: 'user', content: 'Hello, AI!' },
        { sender: 'ai', content: 'Hello! How can I assist you today?' },
      ],
    },
    {
      id: 2,
      title: 'Conversation 2',
      messages: [
        { sender: 'user', content: 'What\'s the weather like?' },
        { sender: 'ai', content: 'I\'m sorry, I don\'t have real-time weather information. You might want to check a weather app or website for the most up-to-date forecast.' },
      ],
    },
  ]);

  const [activeConversation, setActiveConversation] = useState(conversations[0]);

  return (
    <TaskProvider>
      <div className="flex h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200">
        <div className="w-1/4 border-r border-gray-700">
          <ConversationList
            conversations={conversations}
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}
          />
        </div>
        <div className="w-1/2 border-r border-gray-700">
          <ConversationView conversation={activeConversation} />
        </div>
        <div className="w-1/4">
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
};

export default Index;
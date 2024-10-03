import React, { useState } from 'react';
import { MessageSquareIcon, MoreVertical, Settings, Share2, Edit2, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChatSettingsModal from './ChatSettingsModal';

const ConversationList = ({ conversations, activeConversation, setActiveConversation }) => {
  const [chatSettingsOpen, setChatSettingsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  // Sort conversations to put the active one at the top
  const sortedConversations = [...conversations].sort((a, b) => {
    if (a.id === activeConversation.id) return -1;
    if (b.id === activeConversation.id) return 1;
    return 0;
  });

  const handleChatSettings = (chat) => {
    setSelectedChat(chat);
    setChatSettingsOpen(true);
  };

  const handleShare = (chat) => {
    // Implement share functionality
    console.log('Share chat:', chat);
  };

  const handleRename = (chat) => {
    // Implement rename functionality
    console.log('Rename chat:', chat);
  };

  const handleDelete = (chat) => {
    // Implement delete functionality
    console.log('Delete chat:', chat);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-md p-4 h-screen overflow-y-auto">
      <ul>
        {sortedConversations.map((conversation) => (
          <li
            key={conversation.id}
            className={`cursor-pointer p-1 mb-1 rounded transition-all duration-300 flex items-center justify-between ${
              activeConversation.id === conversation.id ? 'bg-gray-700/50 shadow-md' : 'hover:bg-gray-800/50'
            }`}
          >
            <div
              className="flex items-center flex-grow"
              onClick={() => setActiveConversation(conversation)}
            >
              <MessageSquareIcon className="h-4 w-4 mr-2" />
              <span className="text-sm truncate">{conversation.title}</span>
              {conversation.hasUnread && (
                <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleChatSettings(conversation)}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Chat Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare(conversation)}>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRename(conversation)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(conversation)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ))}
      </ul>
      <ChatSettingsModal
        isOpen={chatSettingsOpen}
        onClose={() => setChatSettingsOpen(false)}
        chat={selectedChat}
      />
    </div>
  );
};

export default ConversationList;
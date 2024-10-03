import React, { useState } from 'react';
import { MoreVertical, Settings, Share2, Edit2, Trash2, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatSettingsModal from './ChatSettingsModal';
import ShareModal from './ShareModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import RenameModal from './RenameModal';

const ConversationList = ({ conversations, activeConversation, setActiveConversation, onNewChat }) => {
  const [chatSettingsOpen, setChatSettingsOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
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
    setSelectedChat(chat);
    setShareModalOpen(true);
  };

  const handleRename = (chat) => {
    setSelectedChat(chat);
    setRenameModalOpen(true);
  };

  const handleDelete = (chat) => {
    setSelectedChat(chat);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Implement delete functionality
    console.log('Deleting chat:', selectedChat);
    setDeleteModalOpen(false);
  };

  const confirmRename = (newName) => {
    // Implement rename functionality
    console.log('Renaming chat:', selectedChat, 'to', newName);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-md p-4 h-screen overflow-y-auto flex flex-col">
      <ul className="flex-grow">
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className={`cursor-pointer p-2 mb-2 rounded transition-all duration-300 flex items-center justify-between ${
              activeConversation.id === conversation.id ? 'bg-gray-700/50 shadow-md' : 'hover:bg-gray-800/50'
            }`}
          >
            <div
              className="flex items-center flex-grow"
              onClick={() => setActiveConversation(conversation)}
            >
              <div className="flex -space-x-2 mr-2">
                {conversation.participants.slice(0, 3).map((participant, index) => (
                  <Avatar key={participant.id} className="h-6 w-6 border-2 border-gray-800">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${participant.name}`} />
                    <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                {conversation.participants.length > 3 && (
                  <Avatar className="h-6 w-6 border-2 border-gray-800">
                    <AvatarFallback>+{conversation.participants.length - 3}</AvatarFallback>
                  </Avatar>
                )}
              </div>
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
      <Button onClick={onNewChat} className="mt-4 w-full">
        <Plus className="mr-2 h-4 w-4" /> New Chat
      </Button>
      <ChatSettingsModal
        isOpen={chatSettingsOpen}
        onClose={() => setChatSettingsOpen(false)}
        chat={selectedChat}
      />
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        chatId={selectedChat?.id}
      />
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={selectedChat?.title || 'this chat'}
      />
      <RenameModal
        isOpen={renameModalOpen}
        onClose={() => setRenameModalOpen(false)}
        onRename={confirmRename}
        currentName={selectedChat?.title || ''}
      />
    </div>
  );
};

export default ConversationList;
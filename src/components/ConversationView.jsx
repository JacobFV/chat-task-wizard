import React, { useState } from 'react';
import { addMessage } from '../utils/messageLog';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2, Share2 } from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';
import ShareModal from './ShareModal';

const ConversationView = ({ conversation, onUpdateMessage, onDeleteMessage }) => {
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const handleEditClick = (message) => {
    setEditingMessageId(message.id);
    setEditedContent(message.content);
  };

  const handleEditSubmit = () => {
    onUpdateMessage(editingMessageId, editedContent);
    setEditingMessageId(null);
  };

  const handleDeleteClick = (messageId) => {
    setSelectedMessageId(messageId);
    setDeleteModalOpen(true);
  };

  const handleShareClick = (messageId) => {
    setSelectedMessageId(messageId);
    setShareModalOpen(true);
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
            <div className="flex items-center mb-2">
              <Avatar className="h-6 w-6 mr-2">
                <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.author}`} alt={message.author} />
              </Avatar>
              <span className="text-sm text-gray-400">{message.author}</span>
            </div>
            {editingMessageId === message.id ? (
              <div className="flex items-center">
                <Input
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="flex-grow mr-2"
                />
                <Button onClick={handleEditSubmit} size="sm">Save</Button>
              </div>
            ) : (
              <>
                <p>{message.content}</p>
                <div className="flex justify-end mt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditClick(message)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(message.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleShareClick(message.id)}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
            <small className="text-gray-400">
              {new Date(message.timestamp).toLocaleString()} - Read by: {message.readByIds.length}
            </small>
          </div>
        ))}
      </div>
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          onDeleteMessage(selectedMessageId);
          setDeleteModalOpen(false);
        }}
        itemName="message"
      />
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        chatId={conversation.id}
        messageId={selectedMessageId}
      />
    </div>
  );
};

export default ConversationView;
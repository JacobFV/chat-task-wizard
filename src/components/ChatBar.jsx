import React, { useState } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ChatBar = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-2 bg-gray-800 border-t border-gray-700">
      <Button type="button" variant="ghost" size="icon">
        <Paperclip className="h-5 w-5" />
      </Button>
      <Input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow bg-gray-700 text-white"
      />
      <Button type="button" variant="ghost" size="icon">
        <Mic className="h-5 w-5" />
      </Button>
      <Button type="submit" variant="ghost" size="icon">
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default ChatBar;
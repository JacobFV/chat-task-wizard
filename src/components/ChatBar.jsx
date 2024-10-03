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
    <form onSubmit={handleSubmit} className="absolute bottom-[4em] left-4 right-4">
      <div className="flex items-center space-x-2 p-2 bg-gray-800 border border-gray-700 rounded-full shadow-lg">
        <Button type="button" variant="ghost" size="icon" className="rounded-full">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow bg-transparent border-none focus:ring-0 text-white"
        />
        <Button type="button" variant="ghost" size="icon" className="rounded-full">
          <Mic className="h-5 w-5" />
        </Button>
        <Button type="submit" variant="ghost" size="icon" className="rounded-full">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default ChatBar;
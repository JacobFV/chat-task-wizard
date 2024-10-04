import React, { useState } from 'react';
import { Send } from 'lucide-react';
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
    <form onSubmit={handleSubmit} className="flex-grow mx-2">
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow bg-transparent border-none focus:ring-0 text-white"
        />
        <Button type="submit" variant="ghost" size="icon" className="rounded-full">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default ChatBar;
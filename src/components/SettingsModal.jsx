import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SettingsModal = ({ isOpen, onClose }) => {
  const [openaiKey, setOpenaiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');

  useEffect(() => {
    setOpenaiKey(localStorage.getItem('OPENAI_API_KEY') || '');
    setAnthropicKey(localStorage.getItem('ANTHROPIC_API_KEY') || '');
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('OPENAI_API_KEY', openaiKey);
    localStorage.setItem('ANTHROPIC_API_KEY', anthropicKey);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="openai-key" className="text-right">
              OpenAI API Key
            </Label>
            <Input
              id="openai-key"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="anthropic-key" className="text-right">
              Anthropic API Key
            </Label>
            <Input
              id="anthropic-key"
              value={anthropicKey}
              onChange={(e) => setAnthropicKey(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
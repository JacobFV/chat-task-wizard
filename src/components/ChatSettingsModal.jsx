import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ChatSettingsModal = ({ isOpen, onClose, chat }) => {
  const [enabledTasks, setEnabledTasks] = useState([]);

  useEffect(() => {
    if (chat) {
      setEnabledTasks(chat.enabledTasks || []);
    }
  }, [chat]);

  const handleSave = () => {
    // Save the enabled tasks for the chat
    console.log('Saving enabled tasks:', enabledTasks);
    onClose();
  };

  const toggleTask = (task) => {
    setEnabledTasks((prev) =>
      prev.includes(task)
        ? prev.filter((t) => t !== task)
        : [...prev, task]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat Settings</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <h3 className="mb-2 font-semibold">Enable LLM Tasks:</h3>
          <div className="space-y-2">
            {['Web Search', 'Code Execution', 'Data Analysis', 'Image Generation'].map((task) => (
              <div key={task} className="flex items-center space-x-2">
                <Checkbox
                  id={task}
                  checked={enabledTasks.includes(task)}
                  onCheckedChange={() => toggleTask(task)}
                />
                <Label htmlFor={task}>{task}</Label>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatSettingsModal;
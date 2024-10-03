import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatSettingsModal = ({ isOpen, onClose, chat }) => {
  const [enabledTasks, setEnabledTasks] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState('');
  const [newParticipantPermission, setNewParticipantPermission] = useState('can_view');

  useEffect(() => {
    if (chat) {
      setEnabledTasks(chat.enabledTasks || []);
      setParticipants(chat.participants || []);
    }
  }, [chat]);

  const handleSave = () => {
    // Save the enabled tasks and participants for the chat
    console.log('Saving enabled tasks:', enabledTasks);
    console.log('Saving participants:', participants);
    onClose();
  };

  const toggleTask = (task) => {
    setEnabledTasks((prev) =>
      prev.includes(task)
        ? prev.filter((t) => t !== task)
        : [...prev, task]
    );
  };

  const addParticipant = () => {
    if (newParticipant) {
      setParticipants([...participants, { id: Date.now(), name: newParticipant, permission: newParticipantPermission }]);
      setNewParticipant('');
      setNewParticipantPermission('can_view');
    }
  };

  const removeParticipant = (id) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const updateParticipantPermission = (id, permission) => {
    setParticipants(participants.map(p => p.id === id ? { ...p, permission } : p));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chat Settings</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
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
          <div>
            <h3 className="mb-2 font-semibold">Participants:</h3>
            <div className="space-y-2">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${participant.name}`} />
                    <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{participant.name}</span>
                  <Select
                    value={participant.permission}
                    onValueChange={(value) => updateParticipantPermission(participant.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select permission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="can_view">Can View</SelectItem>
                      <SelectItem value="can_respond">Can Respond</SelectItem>
                      <SelectItem value="can_initiate">Can Initiate Conversation</SelectItem>
                      <SelectItem value="can_invite">Can Invite Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="destructive" size="sm" onClick={() => removeParticipant(participant.id)}>Remove</Button>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                placeholder="Username or Email"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
              />
              <Select value={newParticipantPermission} onValueChange={setNewParticipantPermission}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select permission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="can_view">Can View</SelectItem>
                  <SelectItem value="can_respond">Can Respond</SelectItem>
                  <SelectItem value="can_initiate">Can Initiate Conversation</SelectItem>
                  <SelectItem value="can_invite">Can Invite Others</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={addParticipant}>Add</Button>
            </div>
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
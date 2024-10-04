import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

// Mock action library - in a real app, this would be imported from a separate file
const actionLibrary = [
  { id: 'web_search', name: 'Web Search', integration: 'google' },
  { id: 'code_execution', name: 'Code Execution', integration: 'github' },
  { id: 'data_analysis', name: 'Data Analysis', integration: 'excel' },
  { id: 'image_generation', name: 'Image Generation', integration: 'dall-e' },
];

const SettingsModal = ({ isOpen, onClose }) => {
  const [openaiKey, setOpenaiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [enabledActions, setEnabledActions] = useState([]);

  useEffect(() => {
    setOpenaiKey(localStorage.getItem('OPENAI_API_KEY') || '');
    setAnthropicKey(localStorage.getItem('ANTHROPIC_API_KEY') || '');
    // Mock team members data - in a real app, this would be fetched from an API
    setTeamMembers([
      { id: 1, name: 'John Doe', email: 'john@example.com', defaultPermission: 'can_view' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', defaultPermission: 'can_respond' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', defaultPermission: 'can_initiate' },
    ]);
    setEnabledActions(['web_search', 'code_execution']);
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('OPENAI_API_KEY', openaiKey);
    localStorage.setItem('ANTHROPIC_API_KEY', anthropicKey);
    // Save other settings (team members, enabled actions) to backend or local storage
    onClose();
  };

  const updateTeamMemberPermission = (id, permission) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, defaultPermission: permission } : member
    ));
  };

  const toggleAction = (actionId) => {
    setEnabledActions(prev =>
      prev.includes(actionId)
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="api_keys">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="api_keys">API Keys</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="default_tools">Default Tools</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          <TabsContent value="api_keys">
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
          </TabsContent>
          <TabsContent value="team">
            <div className="space-y-4">
              <h3 className="font-semibold">Team Members:</h3>
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.name}`} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                    <span className="text-sm text-gray-500">{member.email}</span>
                    <Select
                      value={member.defaultPermission}
                      onValueChange={(value) => updateTeamMemberPermission(member.id, value)}
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
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="default_tools">
            <div className="space-y-4">
              <h3 className="font-semibold">Default Enabled Tools:</h3>
              <div className="space-y-2">
                {actionLibrary.map((action) => (
                  <div key={action.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={action.id}
                      checked={enabledActions.includes(action.id)}
                      onCheckedChange={() => toggleAction(action.id)}
                    />
                    <Label htmlFor={action.id}>{action.name}</Label>
                    <span className="text-sm text-gray-500">({action.integration})</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="integrations">
            <div className="space-y-4">
              <h3 className="font-semibold">Connected Accounts:</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Google Account</span>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Slack Account</span>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>GitHub Account</span>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
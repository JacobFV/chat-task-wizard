import React, { useState } from 'react';
import ConversationList from '../components/ConversationList';
import ConversationView from '../components/ConversationView';
import TaskList from '../components/TaskList';
import ChatBar from '../components/ChatBar';
import { TaskProvider } from '../contexts/TaskContext';
import { MessageSquareIcon, CheckSquareIcon, Settings, Share2, Image, Mic } from 'lucide-react';
import SettingsModal from '../components/SettingsModal';
import ShareModal from '../components/ShareModal';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: 'AI Ethics Discussion',
      messages: [
        { id: 1, author: 'user', content: 'What are the main ethical concerns surrounding AI development?', timestamp: '2023-04-10T10:00:00Z', chatId: 1, readByIds: [1] },
        { id: 2, author: 'ai', content: 'The main ethical concerns in AI development include bias in algorithms, privacy issues, job displacement, accountability for AI decisions, and the potential for AI to be used maliciously. For instance, AI systems trained on biased data can perpetuate and amplify societal prejudices.', timestamp: '2023-04-10T10:01:00Z', chatId: 1, readByIds: [1] },
        { id: 3, author: 'user', content: 'How can we address the issue of bias in AI algorithms?', timestamp: '2023-04-10T10:02:00Z', chatId: 1, readByIds: [1] },
        { id: 4, author: 'ai', content: 'Addressing bias in AI algorithms requires a multi-faceted approach. This includes diverse and representative training data, regular audits of AI systems for bias, transparent AI decision-making processes, and diverse teams developing AI. Additionally, implementing ethical guidelines and regulations for AI development can help mitigate bias.', timestamp: '2023-04-10T10:03:00Z', chatId: 1, readByIds: [1] },
        { id: 5, author: 'user', content: 'What role does transparency play in ethical AI development?', timestamp: '2023-04-10T10:04:00Z', chatId: 1, readByIds: [1] },
        { id: 6, author: 'ai', content: 'Transparency is crucial in ethical AI development. It involves making the decision-making processes of AI systems understandable to users and stakeholders. This includes explaining how AI arrives at its conclusions, what data it uses, and its limitations. Transparency builds trust, allows for better oversight, and helps identify potential biases or errors in AI systems.', timestamp: '2023-04-10T10:05:00Z', chatId: 1, readByIds: [1] },
      ],
      hasUnread: true,
      participants: [{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }],
    },
    {
      id: 2,
      title: 'Climate Change Solutions',
      messages: [
        { id: 7, author: 'user', content: 'What are some innovative technologies being developed to combat climate change?', timestamp: '2023-04-11T14:00:00Z', chatId: 2, readByIds: [1] },
        { id: 8, author: 'ai', content: 'Several innovative technologies are being developed to combat climate change. These include: 1) Direct Air Capture (DAC) systems that remove CO2 directly from the atmosphere. 2) Advanced energy storage solutions like solid-state batteries to support renewable energy integration. 3) Green hydrogen production for clean fuel alternatives. 4) Vertical farming and lab-grown meat to reduce agricultural emissions. 5) Enhanced weathering techniques to accelerate natural CO2 absorption processes.', timestamp: '2023-04-11T14:01:00Z', chatId: 2, readByIds: [1] },
        { id: 9, author: 'user', content: 'How effective is reforestation as a climate change mitigation strategy?', timestamp: '2023-04-11T14:02:00Z', chatId: 2, readByIds: [1] },
        { id: 10, author: 'ai', content: 'Reforestation is considered an effective climate change mitigation strategy. Trees act as natural carbon sinks, absorbing CO2 from the atmosphere. Studies suggest that global reforestation could capture up to 205 gigatons of carbon, about two-thirds of human-made carbon emissions. However, it\'s important to note that reforestation alone isn\'t sufficient to combat climate change and should be part of a broader strategy including emissions reduction and other mitigation efforts.', timestamp: '2023-04-11T14:03:00Z', chatId: 2, readByIds: [1] },
        { id: 11, author: 'user', content: 'What role can individuals play in combating climate change?', timestamp: '2023-04-11T14:04:00Z', chatId: 2, readByIds: [1] },
        { id: 12, author: 'ai', content: 'Individuals can play a significant role in combating climate change through various actions: 1) Reducing energy consumption at home and opting for renewable energy sources. 2) Choosing sustainable transportation options like walking, cycling, or using public transit. 3) Adopting a more plant-based diet to reduce the carbon footprint of food consumption. 4) Practicing responsible consumption and reducing waste. 5) Supporting and voting for policies and leaders committed to climate action. 6) Educating others and participating in community initiatives for sustainability.', timestamp: '2023-04-11T14:05:00Z', chatId: 2, readByIds: [1] },
      ],
      hasUnread: false,
      participants: [{ id: 3, name: 'User3' }, { id: 4, name: 'User4' }],
    },
  ]);

  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [leftPaneCollapsed, setLeftPaneCollapsed] = useState(false);
  const [rightPaneCollapsed, setRightPaneCollapsed] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  const toggleLeftPane = () => setLeftPaneCollapsed(!leftPaneCollapsed);
  const toggleRightPane = () => setRightPaneCollapsed(!rightPaneCollapsed);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = (message) => {
    const updatedConversations = conversations.map(conv =>
      conv.id === activeConversation.id
        ? {
            ...conv,
            messages: [
              ...conv.messages,
              {
                id: Date.now(),
                author: 'user',
                content: message,
                timestamp: new Date().toISOString(),
                chatId: conv.id,
                readByIds: [1],
              }
            ]
          }
        : conv
    );
    setConversations(updatedConversations);
    setActiveConversation(updatedConversations.find(conv => conv.id === activeConversation.id));
  };


  return (
    <TaskProvider>
      <div className="flex flex-col h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="shimmer"></div>
        </div>
        <header className="flex justify-between items-center p-1 bg-gray-800 border-b border-gray-700 relative z-20">
          <Button onClick={toggleLeftPane} variant="ghost" size="icon">
            <MessageSquareIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-bold">Chat Task Wizard</h1>
          <div className="flex items-center">
            <Button onClick={toggleRightPane} variant="ghost" size="icon" className="mr-2">
              <CheckSquareIcon className="h-4 w-4" />
            </Button>
            <Button onClick={() => setIsSettingsModalOpen(true)} variant="ghost" size="icon" className="mr-2">
              <Settings className="h-4 w-4" />
            </Button>
            <Button onClick={() => setIsShareModalOpen(true)} variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <div className="flex flex-grow relative z-10">
          {(!isMobileView || !leftPaneCollapsed) && (
            <div className={`transition-all duration-300 ${isMobileView ? 'absolute inset-0 z-30' : leftPaneCollapsed ? 'w-0' : 'w-1/4'} border-r border-gray-700`}>
              <ConversationList
                conversations={conversations}
                activeConversation={activeConversation}
                setActiveConversation={setActiveConversation}
              />
            </div>
          )}
          <div className={`transition-all duration-300 flex flex-col ${isMobileView ? 'w-full' : leftPaneCollapsed && rightPaneCollapsed ? 'w-full' : leftPaneCollapsed || rightPaneCollapsed ? 'w-3/4' : 'w-1/2'}`}>
            <div className="flex-grow overflow-y-auto">
              <ConversationView conversation={activeConversation} />
            </div>
          </div>
          {(!isMobileView || !rightPaneCollapsed) && (
            <div className={`transition-all duration-300 ${isMobileView ? 'absolute inset-0 z-30' : rightPaneCollapsed ? 'w-0' : 'w-1/4'} border-l border-gray-700`}>
              <TaskList activeConversationId={activeConversation.id} />
            </div>
          )}
        </div>
        <div className="fixed bottom-4 left-4 right-4 z-30">
          <div className="bg-gray-800 rounded-full shadow-lg p-2 flex items-center">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Image className="h-5 w-5" />
            </Button>
            <ChatBar onSendMessage={handleSendMessage} />
            <Button variant="ghost" size="icon" className="rounded-full">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
        <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} chatId={activeConversation.id} />
      </div>
    </TaskProvider>
  );
};

export default Index;

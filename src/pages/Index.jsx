import React, { useState } from 'react';
import ConversationList from '../components/ConversationList';
import ConversationView from '../components/ConversationView';
import TaskList from '../components/TaskList';
import { TaskProvider } from '../contexts/TaskContext';

const Index = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: 'AI Ethics Discussion',
      messages: [
        { sender: 'user', content: 'What are the main ethical concerns surrounding AI development?' },
        { sender: 'ai', content: 'The main ethical concerns in AI development include bias in algorithms, privacy issues, job displacement, accountability for AI decisions, and the potential for AI to be used maliciously. For instance, AI systems trained on biased data can perpetuate and amplify societal prejudices.' },
        { sender: 'user', content: 'How can we address the issue of bias in AI algorithms?' },
        { sender: 'ai', content: 'Addressing bias in AI algorithms requires a multi-faceted approach. This includes diverse and representative training data, regular audits of AI systems for bias, transparent AI decision-making processes, and diverse teams developing AI. Additionally, implementing ethical guidelines and regulations for AI development can help mitigate bias.' },
        { sender: 'user', content: 'What role does transparency play in ethical AI development?' },
        { sender: 'ai', content: 'Transparency is crucial in ethical AI development. It involves making the decision-making processes of AI systems understandable to users and stakeholders. This includes explaining how AI arrives at its conclusions, what data it uses, and its limitations. Transparency builds trust, allows for better oversight, and helps identify potential biases or errors in AI systems.' },
      ],
    },
    {
      id: 2,
      title: 'Climate Change Solutions',
      messages: [
        { sender: 'user', content: 'What are some innovative technologies being developed to combat climate change?' },
        { sender: 'ai', content: 'Several innovative technologies are being developed to combat climate change. These include: 1) Direct Air Capture (DAC) systems that remove CO2 directly from the atmosphere. 2) Advanced energy storage solutions like solid-state batteries to support renewable energy integration. 3) Green hydrogen production for clean fuel alternatives. 4) Vertical farming and lab-grown meat to reduce agricultural emissions. 5) Enhanced weathering techniques to accelerate natural CO2 absorption processes.' },
        { sender: 'user', content: 'How effective is reforestation as a climate change mitigation strategy?' },
        { sender: 'ai', content: 'Reforestation is considered an effective climate change mitigation strategy. Trees act as natural carbon sinks, absorbing CO2 from the atmosphere. Studies suggest that global reforestation could capture up to 205 gigatons of carbon, about two-thirds of human-made carbon emissions. However, it\'s important to note that reforestation alone isn\'t sufficient to combat climate change and should be part of a broader strategy including emissions reduction and other mitigation efforts.' },
        { sender: 'user', content: 'What role can individuals play in combating climate change?' },
        { sender: 'ai', content: 'Individuals can play a significant role in combating climate change through various actions: 1) Reducing energy consumption at home and opting for renewable energy sources. 2) Choosing sustainable transportation options like walking, cycling, or using public transit. 3) Adopting a more plant-based diet to reduce the carbon footprint of food consumption. 4) Practicing responsible consumption and reducing waste. 5) Supporting and voting for policies and leaders committed to climate action. 6) Educating others and participating in community initiatives for sustainability.' },
      ],
    },
  ]);

  const [activeConversation, setActiveConversation] = useState(conversations[0]);

  return (
    <TaskProvider>
      <div className="flex h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="shimmer"></div>
        </div>
        <div className="flex w-full h-full relative z-10">
          <div className="w-1/4 border-r border-gray-700">
            <ConversationList
              conversations={conversations}
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
            />
          </div>
          <div className="w-1/2 border-r border-gray-700">
            <ConversationView conversation={activeConversation} />
          </div>
          <div className="w-1/4">
            <TaskList />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
};

export default Index;
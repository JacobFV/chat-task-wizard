import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

const mockTasks = [
  {
    id: 1,
    title: 'Analyze market trends',
    readyForInput: true,
    readyForOutput: false,
    context: 'Conversation 1',
    description: 'Analyze recent market trends for tech startups.',
  },
  {
    id: 2,
    title: 'Generate report',
    readyForInput: false,
    readyForOutput: true,
    context: 'Conversation 2',
    description: 'Generate a comprehensive report on Q2 performance.',
  },
  {
    id: 3,
    title: 'Brainstorm product ideas',
    readyForInput: true,
    readyForOutput: false,
    context: 'Conversation 1',
    description: 'Come up with innovative product ideas for the upcoming quarter.',
  },
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(mockTasks);
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, { ...task, id: Date.now() }]);
  };

  const updateTask = (id, updates) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const removeTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskExpansion = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask, expandedTaskId, toggleTaskExpansion }}>
      {children}
    </TaskContext.Provider>
  );
};
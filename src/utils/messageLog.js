// Central message log
const messageLog = [];

export const addMessage = (message) => {
  messageLog.push(message);
  console.log('New message added to log:', message);
};

export const getMessageLog = () => {
  return messageLog;
};
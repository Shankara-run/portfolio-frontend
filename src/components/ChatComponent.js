import React, { useState } from 'react';
import { useLLMConnection } from '../hooks/useLLMConnection';
import { useChatHistory } from '../hooks/useChatHistory';
import { useAutoScroll } from '../hooks/useAutoScroll';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ErrorBanner from './ErrorBanner'
import api from '../api/api';
import useClearChatOnReload from '../hooks/useClearChatOnReload';


const ChatComponent = ({ showHidden }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { isConnected } = useLLMConnection();
  useChatHistory(setMessages);
  const messagesEndRef = useAutoScroll(messages);

  const sendMessage = async () => {
  if (!inputMessage.trim()) return;

  // ✅ User is interviewer
  const userMessage = {
    id: `${Date.now()}-user`,
    type: 'user', // interviewer
    content: inputMessage.trim(),
    timestamp: new Date().toISOString()
  };

  setMessages(prev => [...prev, userMessage]);
  setInputMessage('');
  setIsLoading(true);

  try {
    const response = await api.post('/chat/send', { message: userMessage.content });
    const data = response.data;

    // ✅ AI always replies as Arun (assistant)
    const aiMessage = {
      id: `${Date.now()}-ai`,
      type: 'assistant', // Arun answering
      content: data.response,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, aiMessage]);
  } catch (err) {
    setError('Network error');
  } finally {
    setIsLoading(false);
  }
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };
useClearChatOnReload(setMessages, setError);
  const themeClasses = {
    background: showHidden ? 'from-gray-900 via-cyan-900 to-gray-900' : 'from-cyan-50 via-white to-blue-50',
    card: showHidden 
      ? 'bg-gray-800/90 border-cyan-500/20 shadow-cyan-500/10' 
      : 'bg-white/90 border-cyan-200/50 shadow-cyan-500/10',
    header: showHidden 
      ? 'bg-gradient-to-r from-cyan-600 to-blue-800' 
      : 'bg-gradient-to-r from-cyan-500 to-blue-600',
    text: {
      primary: showHidden ? 'text-white' : 'text-gray-800',
      secondary: handleKeyPress ? 'text-gray-300' : 'text-gray-600',
      muted: showHidden ? 'text-gray-400' : 'text-gray-500'
    },
    input: showHidden 
      ? 'bg-gray-700/50 border-cyan-500/30 text-white placeholder:text-gray-400' 
      : 'bg-white border-cyan-300 text-gray-800',
    button: {
      primary: showHidden 
        ? 'bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800' 
        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700',
      secondary: showHidden 
        ? 'bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300' 
        : 'bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-700'
    }
  };
 return (
    <div className={`min-h-screen bg-gradient-to-br ${themeClasses.background} p-4`}>
      <div className={`max-w-4xl mx-auto h-[calc(100vh-2rem)] ${themeClasses.card} 
        backdrop-blur-xl border rounded-2xl shadow-2xl flex flex-col overflow-hidden`}>
        
        <ChatHeader isConnected={isConnected} showHidden={showHidden} themeClasses={themeClasses} />

        {error && <ErrorBanner error={error} showHidden={showHidden} />}

        <ChatMessages 
          messages={messages} 
          isLoading={isLoading} 
          showHidden={showHidden} 
          themeClasses={themeClasses} 
          messagesEndRef={messagesEndRef}
          isConnected={isConnected}
        />
       

        <ChatInput 
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          sendMessage={sendMessage}
          isConnected={isConnected}
          isLoading={isLoading}
          showHidden={showHidden}
          themeClasses={themeClasses}
        />
      </div>
    </div>
  );
};



export default ChatComponent;

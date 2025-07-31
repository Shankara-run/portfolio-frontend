import React, { useState } from 'react';
import { useLLMConnection } from '../hooks/useLLMConnection';
import { useChatHistory } from '../hooks/useChatHistory';
import { useAutoScroll } from '../hooks/useAutoScroll';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ErrorBanner from './ErrorBanner';
import api from '../api/api';
import useClearChatOnReload from '../hooks/useClearChatOnReload';
import { MessageCircle } from 'lucide-react';

const ChatWidget = ({ showHidden }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { isConnected } = useLLMConnection();
  useChatHistory(setMessages);
  const messagesEndRef = useAutoScroll(messages);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: `${Date.now()}-user`,
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await api.post('/chat/send', { message: userMessage.content });
      const data = response.data;

      const aiMessage = {
        id: `${Date.now()}-ai`,
        type: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
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
    background: showHidden
      ? 'from-gray-900 via-cyan-900 to-gray-900'
      : 'from-cyan-50 via-white to-blue-50',
    card: showHidden
      ? 'bg-gray-800/90 border-cyan-500/20 shadow-cyan-500/10'
      : 'bg-white/90 border-cyan-200/50 shadow-cyan-500/10',
    header: showHidden
      ? 'bg-gradient-to-r from-cyan-600 to-blue-800'
      : 'bg-gradient-to-r from-cyan-500 to-blue-600',
    text: {
      primary: showHidden ? 'text-white' : 'text-gray-800',
      secondary: showHidden ? 'text-gray-300' : 'text-gray-600',
      muted: showHidden ? 'text-gray-400' : 'text-gray-500',
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
        : 'bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-700',
    },
  };

  return (
    <>
      {/* Floating open button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 bg-cyan-600 text-white p-3 rounded-full shadow-lg hover:bg-cyan-700 transition z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Popup with Slide/Fade Animation */}
      <div
        className={`
          fixed bottom-5 right-5 w-80 h-96 flex flex-col border rounded-lg shadow-lg overflow-hidden z-50
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}
        `}
      >
        <div className={`${themeClasses.card} flex flex-col w-full h-full`}>
          <ChatHeader
            isConnected={isConnected}
            showHidden={showHidden}
            themeClasses={themeClasses}
          />

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

          {/* Close button */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;

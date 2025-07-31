import { useEffect } from 'react';
import api from '../api/api';

export const useChatHistory = (setMessages) => {
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await api.get('/chat/history');
        const history = response.data;
        const formatted = history.reverse().flatMap(item => [
          {
            id: `${item.id}-user`,
            type: 'user',
            content: item.user_message,
            timestamp: item.timestamp,
          },
          {
            id: `${item.id}-ai`,
            type: 'assistant',
            content: item.ai_response,
            timestamp: item.timestamp,
          },
        ]);
        setMessages(formatted);
      } catch (err) {
        console.error('Failed to load chat history', err);
      }
    };

    loadChatHistory();
  }, [setMessages]);
};

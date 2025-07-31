import { useEffect } from 'react';
import api from '../api/api';

const useClearChatOnReload = (setMessages, setError) => {
  useEffect(() => {
    const clearChat = async () => {
      try {
        await api.delete('/chat/history');
        setMessages([]);
      } catch (error) {
        console.error('Failed to clear history on reload:', error);
        setError('Failed to clear history');
      }
    };

    const handleUnload = (event) => {
      // This runs before browser unloads (refresh or close)
      clearChat();
    };

    window.addEventListener('beforeunload', handleUnload);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [setMessages, setError]);
};

export default useClearChatOnReload;

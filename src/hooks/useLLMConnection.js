import { useState, useEffect } from 'react';
import api from '../api/api';

export const useLLMConnection = () => {
  const [isConnected, setIsConnected] = useState(false);

  const checkLLMConnection = async () => {
    try {
      const response = await api.get('/health');
      setIsConnected(response.data.status === 'healthy');
    } catch {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkLLMConnection();
  }, []);

  return { isConnected, checkLLMConnection };
};

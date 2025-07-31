import { useRef, useEffect } from 'react';

export const useAutoScroll = (dependency) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dependency]);

  return messagesEndRef;
};

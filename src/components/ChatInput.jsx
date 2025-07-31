import React from 'react';

const ChatInput = ({ 
  inputMessage, 
  setInputMessage, 
  sendMessage, 
  isLoading, 
  themeClasses 
}) => {

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') { 
      e.preventDefault();  // Prevent form submit if inside a form
      sendMessage();
    }
  };

  return (
    <div className="p-3 border-t">
      <input
        type="text"
        className={`w-full p-2 rounded-md border ${themeClasses.input}`}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyPress} 
        placeholder="Type a message..."
        disabled={isLoading}
      />
    </div>
  );
};

export default ChatInput;

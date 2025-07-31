import { Send } from 'lucide-react';

const ChatInput = ({ inputMessage, setInputMessage, sendMessage, isLoading, themeClasses, handleKeyPress }) => {
  return (
    <div className={`flex items-center space-x-3 px-4 py-2 ${themeClasses.card}`}>
      <input
        type="text"
        className={`w-full px-3 py-2 rounded-lg ${themeClasses.input} focus:outline-none`}
        placeholder="Type your message..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium ${themeClasses.button.primary} 
        hover:opacity-90 focus:outline-none`}
        onClick={sendMessage}
        disabled={isLoading}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatInput;

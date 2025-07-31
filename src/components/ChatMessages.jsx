
import MessageBubble from './MessageBubble';

const ChatMessages = ({ messages, isLoading, themeClasses, showHidden, messagesEndRef }) => {
  if (!messages) return null;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages
        .filter(msg => msg && msg.type)
        .map((msg) => (
          <MessageBubble key={msg.id} message={msg} themeClasses={themeClasses} showHidden={showHidden} />
        ))
      }

      {isLoading && (
        <p className={`${themeClasses.text.muted}`}>Thinking...</p>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;

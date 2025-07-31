import { Bot, User } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const isUser = message.type === 'user'; // interviewer
  return (
    <div
      className={`max-w-[70%] p-3 rounded-xl ${
        isUser
          ? "bg-blue-500 text-white self-end"
          : "bg-gray-700 text-white self-start"
      }`}
    >
      {message.content}
    </div>
  );
};
export default MessageBubble;

const MessageBubble = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-xs shadow ${
          isMe
            ? "bg-orange-500 text-white"
            : "bg-white border"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;

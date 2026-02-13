const ChatListItem = ({ chat, active, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(chat)}
      className={`p-4 cursor-pointer border-b transition hover:bg-orange-50 ${
        active ? "bg-orange-100" : ""
      }`}
    >
      <div className="flex justify-between">
        <span className="font-medium">{chat.name}</span>
        <span className="text-xs text-gray-500">{chat.time}</span>
      </div>
      <p className="text-sm text-gray-500 truncate">
        {chat.lastMessage}
      </p>
    </div>
  );
};

export default ChatListItem;

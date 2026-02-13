import { FaSearch } from "react-icons/fa";
import ChatListItem from "./ChatListItem";

const ChatSidebar = ({ chats, selectedChat, onSelect }) => {
  return (
    <div className="w-1/3 bg-white border-r flex flex-col">

      <div className="p-4 border-b font-bold text-lg">
        Messages
      </div>

      <div className="p-3">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations"
            className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map(chat => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            active={selectedChat?.id === chat.id}
            onSelect={onSelect}
          />
        ))}
      </div>

    </div>
  );
};

export default ChatSidebar;

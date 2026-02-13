const ChatHeader = ({ selectedChat }) => {
  return (
    <div className="p-4 border-b bg-white font-semibold flex justify-between items-center">
      <div>
        {selectedChat?.name || "Select a conversation"}
      </div>
    </div>
  );
};

export default ChatHeader;

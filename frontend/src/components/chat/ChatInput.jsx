import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({ newMessage, setNewMessage, onSend }) => {
  return (
    <div className="p-4 border-t bg-white flex items-center gap-3">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 border rounded-full focus:ring-2 focus:ring-orange-400 outline-none"
      />
      <button
        onClick={onSend}
        className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full"
      >
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default ChatInput;

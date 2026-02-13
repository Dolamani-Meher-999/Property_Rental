import { useState } from "react";
import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatMessages from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";

const dummyChats = [
  { id: 1, name: "John Owner", lastMessage: "Hello!", time: "10:30 AM" },
  { id: 2, name: "Emily Realtor", lastMessage: "See you tomorrow.", time: "Yesterday" },
];

const dummyMessages = [
  { id: 1, sender: "other", text: "Hello! Are you interested?" },
  { id: 2, sender: "me", text: "Yes, tell me more." },
];

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(dummyChats[0]);
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now(),
      sender: "me",
      text: newMessage,
    };

    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <div className="h-screen flex bg-gray-100">

      <ChatSidebar
        chats={dummyChats}
        selectedChat={selectedChat}
        onSelect={setSelectedChat}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader selectedChat={selectedChat} />
        <ChatMessages messages={messages} />
        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSend={sendMessage}
        />
      </div>

    </div>
  );
};

export default ChatPage;

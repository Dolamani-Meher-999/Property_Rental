import { useState } from "react";

export default function AdminMessages() {
  const [activeChat, setActiveChat] = useState(0);

  const chats = [
    {
      id: 1,
      name: "Rahul Sharma",
      lastMessage: "Please approve my listing.",
      messages: [
        { from: "user", text: "Hello admin" },
        { from: "user", text: "Please approve my listing." },
        { from: "admin", text: "Sure, checking now." }
      ]
    },
    {
      id: 2,
      name: "Ankit Verma",
      lastMessage: "Uploaded new property images.",
      messages: [
        { from: "user", text: "I uploaded new images." },
        { from: "admin", text: "Received. Looks good." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eaf6fb] to-[#fde7d8] p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex h-[80vh]">

        {/* LEFT: Chat List */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Messages</h2>
          </div>

          {chats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(index)}
              className={`p-4 cursor-pointer border-b hover:bg-gray-50 ${
                activeChat === index ? "bg-orange-50" : ""
              }`}
            >
              <p className="font-medium">{chat.name}</p>
              <p className="text-sm text-gray-500">
                {chat.lastMessage}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT: Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b font-semibold">
            {chats[activeChat].name}
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chats[activeChat].messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
                  msg.from === "admin"
                    ? "bg-orange-500 text-white ml-auto"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-4 py-2 outline-none"
            />
            <button className="bg-orange-500 text-white px-5 rounded-lg">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

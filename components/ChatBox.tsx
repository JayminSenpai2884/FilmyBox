import React, { useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "User", content: "Hi, is there any event happening this weekend?" },
    { id: 2, sender: "Admin", content: "Yes, we have several events lined up. Let me share the details." },
    { id: 3, sender: "User", content: "Great! I'm interested to know more." },
    { id: 4, sender: "Admin", content: "Sure, here are some upcoming events:" },
    { id: 5, sender: "Admin", content: "1. Classic Movies Night - Saturday, 26th February, 7:00 PM, Main Theater" },
    { id: 6, sender: "Admin", content: "2. Sci-Fi Saturdays - Saturday, 26th February, 8:00 PM, Sci-Fi Lounge" },
    { id: 7, sender: "Admin", content: "3. Anime Nights - Friday, 25th February, 8:00 PM, Anime Lounge" },
    { id: 8, sender: "User", content: "Thanks for sharing! I'm interested in Classic Movies Night." },
    { id: 9, sender: "Admin", content: "Awesome! Enjoy the event!" },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const handleToggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "User", content: inputMessage }
      ]);
      setInputMessage("");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 mb-4 ml-4">
      <button id="open-chat" className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300 flex items-center" onClick={handleToggleChatbox}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Chat Room
      </button>
      {isChatboxOpen && (
        <div id="chat-container" className="fixed bottom-16 left-4 w-96">
          <div className="bg-gray-800 shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b bg-gray-700 text-white rounded-t-lg flex justify-between items-center">
              <p className="text-lg font-semibold">Events chat Room</p>
              <button id="close-chat" className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400" onClick={handleToggleChatbox}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div id="chatbox" className="p-4 h-80 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`mb-2 ${message.sender === "Admin" ? "text-right" : ""}`}>
                  <p className={`bg-gray-600 text-gray-300 rounded-lg py-2 px-4 inline-block ${message.sender === "Admin" ? "bg-gray-700 text-white" : ""}`}>
                    {message.content}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex">
              <input 
                id="user-input" 
                type="text" 
                placeholder="Type a message" 
                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-700 text-white"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button 
                id="send-button" 
                className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 transition duration-300"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

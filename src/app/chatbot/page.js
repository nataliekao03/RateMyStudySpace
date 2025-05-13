"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const api_key = process.env.NEXT_PUBLIC_OPENAI_KEY;

const Chatbot = () => {
  const router = useRouter(); // Initialize the router
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    try {
      const result = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // Ensure correct model name
          messages: [
            { role: "system", content: "You are a study space expert." },
            ...newMessages.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
          ],
          temperature: 0.7,
          store: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api_key}`,
            
          },
        }
      );

      // Extract the bot's response
      const botResponse = result.data.choices[0].message.content; // Extract the bot's response
      setMessages([
        ...newMessages,
        { text: botResponse, sender: "bot" }, // Add bot's response to the messages
      ]);
    } catch (error) {
      console.error("Error calling OpenAI API:", error); // Log error
      setMessages([
        ...newMessages,
        { text: "Sorry, something went wrong. Please try again later.", sender: "bot" }, // Error message
      ]);
    } finally {
      setLoading(false); // Stop loading
    }
  };



  // Function to back out
  const back = () => {
    router.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 text-center">How can I help?</h1>

      {/* Chat Container */}
      <div className="chatbot-container bg-white shadow-lg rounded-lg flex flex-col h-[75vh] p-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-2 mb-4">
          {messages.map((msg, index) => (
    <div
      key={index}
      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`px-4 py-2 rounded-xl text-sm max-w-[80%] break-words ${
          msg.sender === "user"
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        {msg.text}
      </div>
    </div>
  ))}
</div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message here..."
            disabled={loading}
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-4">
        <button
          onClick={back}
          className="bg-gray-700 text-white w-full py-2 rounded-lg"
        >
          Go Back to Main Page
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
import React from "react";
import ChatBot from "react-simple-chatbot";

const steps = [
  { id: "1", message: "Hello! How can I help you today?", trigger: "user-input" },
  { id: "user-input", user: true, trigger: "response" },
  { id: "response", message: "Thanks for your question! Our team will review it.", end: true }
];

export default function HealthChatbot() {
  return <ChatBot steps={steps} />;
}

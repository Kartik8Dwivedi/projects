import { useState, useEffect } from "react";

const TextInput = () => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const placeholders = [
    "Message ChatGPT",
    "Ask me anything...",
    "How can I help?",
    "Type your query...",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentPlaceholder(placeholders[placeholderIndex]);
  }, [placeholderIndex]);

  return (
    <div className="w-full max-w-lg mx-auto ">
      <input
        type="text"
        className="w-full p-4  rounded-full outline-none transition-all duration-300 ease-in-out shadow-lg px-6"
        placeholder={currentPlaceholder}
      />
    </div>
  );
};

export default TextInput;

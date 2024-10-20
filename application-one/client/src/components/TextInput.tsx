import { useState, useEffect } from "react";
import "./TextInput.css";

const TextInput = ({
  rule,
  setRule,
  setSubmit,
}: {
  rule: string;
  setRule: (value: string) => void;
  setSubmit: (value: boolean) => void;
}) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [textValue, setTextValue] = useState(rule); 
  const placeholders = [
    "Write your rules here",
    "Create Rules for your queries",
    "Create rules with ease",
    "Rules are easy to create",
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

  useEffect(() => {
    setTextValue(rule); 
  }, [rule]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
    setRule(e.target.value); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setSubmit(true); 
    }
  };

  return (
    <div className="min-w-full max-w-lg mx-auto">
      <textarea
        className="custom-textarea w-full p-4 rounded-lg outline-none transition-all duration-300 ease-in-out shadow-lg px-6"
        placeholder={currentPlaceholder}
        rows={10}
        value={textValue} 
        onChange={handleChange} 
        onKeyDown={handleKeyDown} 
      />
    </div>
  );
};

export default TextInput;

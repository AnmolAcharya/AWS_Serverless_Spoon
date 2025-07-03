import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Tell me the ingredients you want to use for your meal." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = input;
    setMessages([...messages, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      // Show loading spinner as a bot message
      // Wait a tick so spinner appears before fetch
      setTimeout(async () => {
        try {
          const res = await fetch("https://yvtzeqhutf.execute-api.us-east-2.amazonaws.com/dev/test", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ grocery_items: userMessage })
          });

          const data = await res.json();
          const botReply = data.body || "Sorry, I couldn't generate recipes right now.";

          setMessages(msgs => [
            ...msgs,
            { sender: "bot", text: botReply }
          ]);
        } catch (error) {
          setMessages(msgs => [
            ...msgs,
            { sender: "bot", text: "Oops! There was an error getting recipes." }
          ]);
        } finally {
          setLoading(false);
        }
      }, 100);
    } catch (error) {
      setMessages(msgs => [
        ...msgs,
        { sender: "bot", text: "Oops! There was an error getting recipes." }
      ]);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">🍳 Recipe Generator</div>
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chatbot-message ${msg.sender}`}>{msg.text}</div>
        ))}
        {loading && (
          <div className="chatbot-message bot">
            <span className="chatbot-spinner" /> Generating recipes...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input-row">
        <input
          className="chatbot-input"
          type="text"
          placeholder="Type ingredients..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button className="chatbot-send" onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;



// import { useState, useRef, useEffect } from "react";
// import "./ChatBot.css";

// const ChatBot = () => {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hi! Tell me the ingredients you want to use for your meal." },
//     { sender: "user", text: "Chicken, rice, broccoli" },
//     { sender: "bot", text: "Great! I'll suggest some meal ideas soon." },
//   ]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSend = () => {
//     if (input.trim() === "") return;
//     setMessages([...messages, { sender: "user", text: input }]);
//     setInput("");
//     // Placeholder for API call/response
//     setTimeout(() => {
//       setMessages(msgs => [...msgs, { sender: "bot", text: "(Meal suggestions will appear here...)" }]);
//     }, 800);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleSend();
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="chatbot-header">🍳 Recipe Generator</div>
//       <div className="chatbot-messages">
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`chatbot-message ${msg.sender}`}>{msg.text}</div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="chatbot-input-row">
//         <input
//           className="chatbot-input"
//           type="text"
//           placeholder="Type ingredients..."
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//         />
//         <button className="chatbot-send" onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatBot; 
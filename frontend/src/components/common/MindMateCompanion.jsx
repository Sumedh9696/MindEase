import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Bot, MessageCircle } from 'lucide-react';
import { api } from '../../services/api';

export default function MindMateCompanion({ isFullPage = false }) {
  const [messages, setMessages] = useState([
    {
      id: 'init_1',
      sender: 'assistant',
      message: "Hello! I'm MindMate. I can support you on your wellness journey today. 🧡",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickChips = [
    { label: "I'm stressed", prompt: "I'm stressed and feeling overwhelmed right now." },
    { label: "Help me relax", prompt: "Can you guide me with a quick calming suggestion?" },
    { label: "I feel anxious", prompt: "I feel anxious and need help grounding myself." }
  ];

  useEffect(() => {
    // Load chat history from backend
    api.getMindMateHistory()
      .then(history => {
        if (history && history.length > 0) {
          setMessages(history);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text || text.trim() === '' || isLoading) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      message: text.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await api.sendMindMateMessage(text.trim());
      if (res && res.reply) {
        setMessages(prev => [...prev, res.reply]);
      }
    } catch (err) {
      // Gentle fallback
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `err_${Date.now()}`,
            sender: 'assistant',
            message: "Thank you for sharing your feelings with me. Take a slow, grounding breath. You are safe, and we will walk through this together.",
            timestamp: new Date().toISOString()
          }
        ]);
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-3xl border border-[#EFE8DD] shadow-sm flex flex-col overflow-hidden transition-all ${
      isFullPage ? 'h-[750px] max-w-2xl mx-auto' : 'h-[540px]'
    }`}>
      
      {/* Header */}
      <div className="p-4 border-b border-[#F2ECE1] flex items-center justify-between bg-[#FAF6F0]/40">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#F5D8CE] text-[#E77A57] flex items-center justify-center font-bold text-sm shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#2C2622] leading-tight">
              MindMate AI Companion
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#86C59C] animate-pulse"></span>
              <span className="text-[11px] text-[#786F66]">Online</span>
            </div>
          </div>
        </div>

        <button className="text-xs font-semibold text-[#E77A57] hover:underline flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          Full chat
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#E77A57] text-white rounded-br-xs'
                    : 'bg-[#FAF4EB] text-[#2C2622] border border-[#EFE8DD] rounded-bl-xs'
                }`}
              >
                <p>{msg.message}</p>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-[#FAF4EB] text-[#786F66] border border-[#EFE8DD] rounded-2xl rounded-bl-xs p-3 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#E77A57] rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[#E77A57] rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-[#E77A57] rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="px-4 py-2 border-t border-[#F5EFE6] bg-[#FAF8F5]/50 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip.prompt)}
            className="flex-shrink-0 text-[11px] font-medium px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#EFE8DD] text-[#786F66] hover:text-[#2C2622] hover:border-[#E77A57]/50 hover:bg-[#FAF4EB] transition-all"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-[#EFE8DD]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-[#FAF4EB] border border-[#EFE8DD] rounded-full pl-4 pr-11 py-2 text-xs sm:text-sm text-[#2C2622] placeholder-[#A89F93] focus:outline-none focus:ring-2 focus:ring-[#E77A57]/30 focus:border-[#E77A57]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 w-7 h-7 rounded-full bg-[#E77A57] text-white flex items-center justify-center hover:bg-[#D96946] disabled:opacity-40 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        <p className="text-[10px] text-center text-[#A89F93] mt-2">
          Not a replacement for professional mental health support.
        </p>
      </div>

    </div>
  );
}

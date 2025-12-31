'use client';
import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '15px', background: '#000', color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
        AI Assistant
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '15px', background: '#f5f5f5' }}>
        {messages.map(m => (
          <div key={m.id} style={{ 
            marginBottom: '10px', 
            textAlign: m.role === 'user' ? 'right' : 'left' 
          }}>
            <span style={{ 
              display: 'inline-block', 
              padding: '8px 12px', 
              borderRadius: '15px', 
              background: m.role === 'user' ? '#0070f3' : '#fff',
              color: m.role === 'user' ? '#fff' : '#000',
              maxWidth: '80%',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              {m.content}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} style={{ padding: '10px', borderTop: '1px solid #ddd', background: '#fff', display: 'flex' }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask anything..."
          style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '5px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Send
        </button>
      </form>
    </div>
  );
}
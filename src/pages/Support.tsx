import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { initialChatMessages, autoReplies, ChatMessage } from '@/data/chatMessages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

export default function Support() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: input, day: 0, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    const userInput = input.toLowerCase();
    setInput('');

    setTyping(true);
    setTimeout(() => {
      const match = autoReplies.find(r => r.keywords.some(k => userInput.includes(k)));
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: match?.response || "Thank you for your message. Our care team will review this and respond shortly. For urgent concerns, please call our helpline at +91 22 4000 1234.",
        day: 0,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setTyping(false);
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  let lastDay = -1;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex flex-1 flex-col py-4">
        <h1 className="mb-4 text-xl font-bold text-foreground">Care Support</h1>
        <div className="flex flex-1 flex-col rounded-xl border border-border bg-card">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg">💊</div>
            <div>
              <p className="text-sm font-semibold text-foreground">Laso Health Support</p>
              <p className="text-xs text-success">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4" style={{ maxHeight: '55vh' }}>
            {messages.map((msg) => {
              const showDayLabel = msg.day > 0 && msg.day !== lastDay;
              if (msg.day > 0) lastDay = msg.day;
              return (
                <div key={msg.id}>
                  {showDayLabel && (
                    <div className="my-4 text-center text-xs text-muted-foreground">
                      <span className="rounded-full bg-muted px-3 py-1">Day {msg.day}</span>
                    </div>
                  )}
                  <div className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.sender === 'user' ? 'rounded-br-md bg-primary text-primary-foreground' : 'rounded-bl-md bg-muted text-foreground'}`}>
                      {msg.text}
                      <p className={`mt-1 text-[10px] ${msg.sender === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{msg.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            {typing && (
              <div className="mb-3 flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <Input placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} className="flex-1" />
              <Button type="submit" size="icon"><Send className="h-4 w-4" /></Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

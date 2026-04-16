import { useState, useRef, useEffect, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { initialChatMessages, autoReplies, ChatMessage } from '@/data/chatMessages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, AlertTriangle } from 'lucide-react';

// Proactive messages based on patient state (simulated)
const proactiveAlerts = [
  { condition: 'missed_doses', message: "⚠️ I noticed you missed 2 doses this week. Consistent dosing is important for treatment effectiveness. Would you like tips on building a medication routine?" },
  { condition: 'plateau', message: "📊 Your weight has been relatively stable for the past 3 weeks. This is common around weeks 6-8. Dr. Sharma will review this at your next consultation." },
  { condition: 'milestone', message: "🎉 Milestone: You've completed 12 weeks of treatment! Total weight loss: 6.2 kg (6.7%). Your HbA1c has improved from 8.4% to 7.1%. Great progress — keep it up." },
];

export default function Support() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Show proactive alert after mount
  useEffect(() => {
    if (alertShown) return;
    const timer = setTimeout(() => {
      const alert = proactiveAlerts[2]; // milestone
      const proactiveMsg: ChatMessage = {
        id: `proactive-${Date.now()}`,
        sender: 'bot',
        text: alert.message,
        day: 0,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, proactiveMsg]);
      setAlertShown(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [alertShown]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      day: 0,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    const userInput = input.toLowerCase();
    setInput('');

    setTyping(true);
    setTimeout(() => {
      // Context-aware responses
      let responseText = '';

      // Check for specific clinical queries
      if (userInput.includes('progress') || userInput.includes('how am i doing')) {
        responseText = "Here's your progress summary: Over 12 weeks, you've lost 6.2 kg (6.7% of starting weight). Your HbA1c improved from 8.4% to 7.1%. Fasting glucose is down to 122 mg/dL. Your doctor considers this a good response to treatment.";
      } else if (userInput.includes('plan') || userInput.includes('treatment')) {
        responseText = "Your current treatment plan includes Semaglutide 14mg daily, taken 30 minutes before breakfast. Your next consultation with Dr. Sharma is on April 28. You can view your full treatment plan in the Dashboard under 'Treatment Plan'.";
      } else if (userInput.includes('refill') || userInput.includes('order') || userInput.includes('medication supply')) {
        responseText = "You have approximately 8 days of Semaglutide 14mg remaining. An auto-refill is scheduled for April 22. You can also reorder manually from the Orders page.";
      } else if (userInput.includes('stop') || userInput.includes('discontinue') || userInput.includes('quit')) {
        responseText = "⚠️ Please do not stop your medication without consulting Dr. Sharma. Abrupt discontinuation can affect your blood sugar control. If you're experiencing side effects, let me know and we can discuss management options or escalate to your doctor.";
      } else {
        const match = autoReplies.find(r => r.keywords.some(k => userInput.includes(k)));
        responseText = match?.response || "Thank you for your message. Our care team will review this and respond shortly. For urgent concerns, please call our helpline at +91 22 4000 1234.";
      }

      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: responseText,
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
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg">💊</div>
              <div>
                <p className="text-sm font-semibold text-foreground">Laso Health Care Coordinator</p>
                <p className="text-xs text-success">Online · Context-aware</p>
              </div>
            </div>
            <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary">AI-Assisted</Badge>
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

          {/* Quick Actions */}
          <div className="border-t border-border px-4 py-2">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {['How am I doing?', 'Refill status', 'Side effects', 'Next appointment'].map(q => (
                <button key={q} onClick={() => { setInput(q); }}
                  className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  {q}
                </button>
              ))}
            </div>
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

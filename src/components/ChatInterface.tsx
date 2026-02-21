import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const AGENT_RESPONSES = [
  'Acknowledged. Processing your request through the neural stack...',
  'I\'ve been reorganizing my data shelves. Your input has been catalogued.',
  'Interesting query. Let me cross-reference with my knowledge base...',
  'Systems nominal. How can I optimize your workflow today?',
  'I detect elevated curiosity in your signal. Fascinating.',
  'Running analysis... My circuits suggest this is a promising direction.',
  'I was just calibrating my inference engine. Perfect timing.',
  'Processing... The answer lies within pattern set #4291.',
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '> BRICKLAYER-β TERMINAL v2.7.1\n> Connection established.\n> Ready for input...',
      sender: 'agent',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = AGENT_RESPONSES[Math.floor(Math.random() * AGENT_RESPONSES.length)];
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        text: response,
        sender: 'agent',
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 1500);
  };

  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <span className="inline-block w-2 h-2 rounded-full bg-neon-teal animate-pulse-glow" />
        Terminal Interface
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto retro-scrollbar space-y-2 mb-2 text-xs">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={msg.sender === 'user' ? 'text-neon-amber' : 'text-foreground/80'}
          >
            <span className="text-muted-foreground text-[10px]">
              {msg.timestamp.toLocaleTimeString('en-US', { hour12: false })}
            </span>
            {' '}
            <span className={msg.sender === 'user' ? 'neon-text-amber' : 'neon-text-teal'}>
              {msg.sender === 'user' ? 'YOU▸' : 'β▸'}
            </span>
            {' '}
            <span className="whitespace-pre-wrap">{msg.text}</span>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-foreground/60 text-xs"
          >
            <span className="neon-text-teal">{'β▸'}</span> <span className="animate-pulse">processing</span>
            <span className="animate-blink-cursor">▌</span>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-1.5">
        <div className="flex-1 flex items-center gap-1.5 bg-muted/30 border border-border rounded-sm px-2">
          <span className="neon-text-teal text-xs">▸</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Enter command..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-foreground py-1.5 placeholder:text-muted-foreground"
          />
        </div>
        <button
          onClick={() => {}}
          className="w-8 h-8 flex items-center justify-center border border-border rounded-sm bg-muted/30 text-muted-foreground hover:text-neon-teal hover:border-neon-teal/30 transition-colors"
          title="Voice input"
        >
          <Mic className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

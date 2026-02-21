import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AgentNode {
  id: number;
  x: number;
  y: number;
  name: string;
  active: boolean;
}

const AGENT_NAMES = ['β-Prime', 'β-Echo', 'β-Node3', 'β-Relay', 'β-Ghost'];

export default function AgentPresence() {
  const [agents, setAgents] = useState<AgentNode[]>([]);

  useEffect(() => {
    const count = 3 + Math.floor(Math.random() * 3);
    const nodes: AgentNode[] = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        id: i,
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 60,
        name: i === 0 ? 'Bricklayer-β' : AGENT_NAMES[i % AGENT_NAMES.length],
        active: i === 0 || Math.random() > 0.3,
      });
    }
    setAgents(nodes);
  }, []);

  // Fluctuate agent count
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => {
        const updated = prev.map(a => ({
          ...a,
          x: a.x + (Math.random() - 0.5) * 3,
          y: a.y + (Math.random() - 0.5) * 3,
          active: a.id === 0 ? true : Math.random() > 0.15,
        }));
        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const activeCount = agents.filter(a => a.active).length;

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="inline-block w-2 h-2 rounded-full bg-neon-blue animate-pulse-glow" />
        Agent Network
        <span className="ml-auto text-[10px] neon-text-teal">{activeCount} ACTIVE</span>
      </div>

      <div className="relative h-28 overflow-hidden rounded-sm bg-muted/10">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full">
          {agents.map((a, i) =>
            agents.slice(i + 1).map((b, j) => (
              a.active && b.active ? (
                <motion.line
                  key={`${a.id}-${b.id}`}
                  x1={`${a.x}%`} y1={`${a.y}%`}
                  x2={`${b.x}%`} y2={`${b.y}%`}
                  stroke="hsl(168, 100%, 50%)"
                  strokeWidth="0.5"
                  strokeOpacity={0.2}
                  animate={{ strokeOpacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 2 + j, repeat: Infinity }}
                />
              ) : null
            ))
          )}
        </svg>

        {/* Agent nodes */}
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            className="absolute flex flex-col items-center"
            style={{ left: `${agent.x}%`, top: `${agent.y}%` }}
            animate={{
              x: [0, (Math.random() - 0.5) * 4],
              y: [0, (Math.random() - 0.5) * 4],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className={`w-3 h-3 rounded-full ${agent.active ? 'bg-neon-teal' : 'bg-muted-foreground/30'}`}
              style={agent.active ? { boxShadow: '0 0 8px hsl(168 100% 50% / 0.5)' } : {}}
              animate={agent.active ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className={`text-[8px] mt-0.5 whitespace-nowrap ${agent.id === 0 ? 'neon-text-teal' : 'text-muted-foreground'}`}>
              {agent.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

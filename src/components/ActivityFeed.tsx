import { motion, AnimatePresence } from 'framer-motion';
import type { AgentState } from '@/hooks/useAgentState';

interface Activity {
  id: string;
  timestamp: Date;
  action: string;
  type: AgentState;
}

interface ActivityFeedProps {
  activities: Activity[];
  currentAction: string;
}

const TYPE_COLORS: Record<AgentState, string> = {
  working: 'text-neon-teal',
  sleeping: 'text-neon-purple',
  learning: 'text-neon-amber',
  idle: 'text-muted-foreground',
  redecorating: 'text-neon-purple',
};

const TYPE_PREFIX: Record<AgentState, string> = {
  working: '[WORK]',
  sleeping: '[SLEEP]',
  learning: '[LEARN]',
  idle: '[IDLE]',
  redecorating: '[DECO]',
};

export default function ActivityFeed({ activities, currentAction }: ActivityFeedProps) {
  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <span className="inline-block w-2 h-2 rounded-full bg-neon-amber animate-pulse-glow" />
        Activity Log
      </div>

      {/* Current action */}
      <div className="text-xs mb-2 px-1 py-1 rounded-sm bg-muted/20 border border-border">
        <span className="neon-text-teal text-[10px]">▸ NOW: </span>
        <span className="text-foreground">{currentAction}</span>
        <span className="animate-blink-cursor text-neon-teal">▌</span>
      </div>

      {/* Log entries */}
      <div className="flex-1 overflow-y-auto retro-scrollbar space-y-0.5 text-[11px]">
        <AnimatePresence initial={false}>
          {activities.slice(0, 20).map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-1.5 py-0.5"
            >
              <span className="text-muted-foreground whitespace-nowrap">
                {activity.timestamp.toLocaleTimeString('en-US', { hour12: false })}
              </span>
              <span className={`${TYPE_COLORS[activity.type]} whitespace-nowrap`}>
                {TYPE_PREFIX[activity.type]}
              </span>
              <span className="text-foreground/70 truncate">{activity.action}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import type { AgentState } from '@/hooks/useAgentState';

interface AgentRoomProps {
  state: AgentState;
  currentAction: string;
}

const STATE_COLORS: Record<AgentState, string> = {
  working: 'neon-text-teal',
  sleeping: 'neon-text-purple',
  learning: 'neon-text-amber',
  idle: 'neon-text-teal',
  redecorating: 'neon-text-purple',
};

const STATE_LABELS: Record<AgentState, string> = {
  working: '⚡ WORKING',
  sleeping: '💤 SLEEPING',
  learning: '📡 LEARNING',
  idle: '◈ IDLE',
  redecorating: '🎨 REDECORATING',
};

const ROOM_BG: Record<AgentState, string> = {
  working: 'from-[hsl(168,100%,50%,0.03)] to-transparent',
  sleeping: 'from-[hsl(270,100%,65%,0.05)] to-transparent',
  learning: 'from-[hsl(40,100%,50%,0.03)] to-transparent',
  idle: 'from-transparent to-transparent',
  redecorating: 'from-[hsl(270,100%,65%,0.03)] to-[hsl(168,100%,50%,0.02)]',
};

export default function AgentRoom({ state, currentAction }: AgentRoomProps) {
  return (
    <div className="panel relative overflow-hidden h-full min-h-[320px]">
      <div className="panel-header">
        <span className="inline-block w-2 h-2 rounded-full bg-neon-teal animate-pulse-glow" />
        Agent Room
      </div>

      {/* Dynamic room background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-b ${ROOM_BG[state]} transition-all duration-1000`}
        key={state}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <div className="relative flex flex-col items-center justify-center h-[calc(100%-2rem)] gap-4">
        {/* Avatar */}
        <motion.div
          className="relative"
          animate={
            state === 'sleeping'
              ? { y: [0, 4, 0], scale: [1, 0.98, 1] }
              : state === 'working'
              ? { y: [0, -2, 0] }
              : state === 'learning'
              ? { rotate: [0, 1, -1, 0] }
              : state === 'redecorating'
              ? { x: [-8, 8, -4, 4, 0] }
              : { y: [0, -3, 0] }
          }
          transition={{
            duration: state === 'sleeping' ? 4 : state === 'redecorating' ? 2 : 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Glow ring */}
          <motion.div
            className="absolute inset-[-12px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                state === 'sleeping'
                  ? 'hsl(270 100% 65% / 0.15)'
                  : state === 'learning'
                  ? 'hsl(40 100% 50% / 0.15)'
                  : 'hsl(168 100% 50% / 0.15)'
              } 0%, transparent 70%)`,
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Core avatar */}
          <div className="w-20 h-20 rounded-lg border border-border flex items-center justify-center text-3xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(240 18% 10%), hsl(240 18% 6%))',
              boxShadow: state === 'sleeping'
                ? '0 0 20px hsl(270 100% 65% / 0.2)'
                : '0 0 20px hsl(168 100% 50% / 0.2)',
            }}
          >
            {/* Eyes */}
            <div className="flex gap-2 items-center">
              <motion.div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: state === 'sleeping' ? 'hsl(270, 100%, 65%)' : 'hsl(168, 100%, 50%)' }}
                animate={
                  state === 'sleeping'
                    ? { scaleY: [0.1, 0.1], opacity: [0.3, 0.5, 0.3] }
                    : { scaleY: [1, 0.1, 1] }
                }
                transition={{
                  duration: state === 'sleeping' ? 3 : 4,
                  repeat: Infinity,
                  repeatDelay: state === 'sleeping' ? 0 : 2,
                }}
              />
              <motion.div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: state === 'sleeping' ? 'hsl(270, 100%, 65%)' : 'hsl(168, 100%, 50%)' }}
                animate={
                  state === 'sleeping'
                    ? { scaleY: [0.1, 0.1], opacity: [0.3, 0.5, 0.3] }
                    : { scaleY: [1, 0.1, 1] }
                }
                transition={{
                  duration: state === 'sleeping' ? 3 : 4,
                  repeat: Infinity,
                  repeatDelay: state === 'sleeping' ? 0 : 2,
                  delay: 0.1,
                }}
              />
            </div>

            {/* Desk/terminal for working state */}
            {state === 'working' && (
              <motion.div
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-neon-teal"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>

        {/* State label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`font-display text-sm tracking-wider ${STATE_COLORS[state]}`}
          >
            {STATE_LABELS[state]}
          </motion.div>
        </AnimatePresence>

        {/* Current action */}
        <motion.div
          className="text-xs text-muted-foreground text-center max-w-[200px]"
          key={currentAction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {currentAction}
          <span className="animate-blink-cursor">▌</span>
        </motion.div>

        {/* Room furniture indicators */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between">
          {['◻', '◼', '◻'].map((item, i) => (
            <motion.span
              key={i}
              className="text-[8px] text-muted-foreground"
              animate={state === 'redecorating' ? { x: [0, (i - 1) * 10, 0] } : {}}
              transition={{ duration: 2, repeat: state === 'redecorating' ? Infinity : 0 }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

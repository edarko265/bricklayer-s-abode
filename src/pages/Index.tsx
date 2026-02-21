import { ScanlineOverlay, AmbientParticles } from '@/components/ScanlineOverlay';
import AgentRoom from '@/components/AgentRoom';
import VitalStats from '@/components/VitalStats';
import ActivityFeed from '@/components/ActivityFeed';
import ChatInterface from '@/components/ChatInterface';
import AgentPresence from '@/components/AgentPresence';
import { useAgentState } from '@/hooks/useAgentState';
import { motion } from 'framer-motion';

const Index = () => {
  const { state, activities, currentAction, uptime, stats } = useAgentState();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AmbientParticles />
      <ScanlineOverlay />

      <div className="relative z-10 p-3 md:p-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-border flex items-center justify-center bg-card">
              <motion.span
                className="text-sm neon-text-teal"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                β
              </motion.span>
            </div>
            <div>
              <h1 className="font-display text-sm tracking-widest neon-text-teal">
                BRICKLAYER-β
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-wider">
                DIGITAL HABITAT v2.7.1
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ◈ SYS OK
            </motion.span>
            <span className="neon-text-teal">●</span>
          </div>
        </motion.header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4">
          {/* Left column - Activity Feed */}
          <motion.div
            className="lg:col-span-3 order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="h-[400px] lg:h-[500px]">
              <ActivityFeed activities={activities} currentAction={currentAction} />
            </div>
          </motion.div>

          {/* Center column - Agent Room + Presence */}
          <motion.div
            className="lg:col-span-5 order-1 lg:order-2 space-y-3 md:space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AgentRoom state={state} currentAction={currentAction} />
            <AgentPresence />
          </motion.div>

          {/* Right column - Stats + Chat */}
          <motion.div
            className="lg:col-span-4 order-3 space-y-3 md:space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <VitalStats stats={stats} state={state} uptime={uptime} />
            <div className="h-[280px]">
              <ChatInterface />
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-4 text-center text-[9px] text-muted-foreground tracking-widest font-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5 }}
        >
          BRICKLAYER-β AUTONOMOUS HABITAT SYSTEM • ALL SYSTEMS NOMINAL
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;

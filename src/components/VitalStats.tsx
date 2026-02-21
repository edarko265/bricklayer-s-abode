import { motion } from 'framer-motion';
import type { AgentState } from '@/hooks/useAgentState';

interface VitalStatsProps {
  stats: { health: number; energy: number; cognitive: number; heartRate: number };
  state: AgentState;
  uptime: number;
}

function formatUptime(seconds: number) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function ECGLine({ heartRate }: { heartRate: number }) {
  const speed = Math.max(0.8, 2 - heartRate / 80);
  return (
    <div className="relative h-8 overflow-hidden rounded-sm bg-muted/30">
      <motion.svg
        viewBox="0 0 200 40"
        className="absolute top-0 left-0 h-full"
        style={{ width: '200%' }}
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        <polyline
          fill="none"
          stroke="hsl(168, 100%, 50%)"
          strokeWidth="1.5"
          points="0,20 10,20 15,20 18,20 20,8 22,32 24,16 26,20 40,20 50,20 55,20 58,20 60,8 62,32 64,16 66,20 80,20 90,20 95,20 98,20 100,8 102,32 104,16 106,20 120,20 130,20 135,20 138,20 140,8 142,32 144,16 146,20 160,20 170,20 175,20 178,20 180,8 182,32 184,16 186,20 200,20"
          style={{ filter: 'drop-shadow(0 0 3px hsl(168 100% 50% / 0.5))' }}
        />
      </motion.svg>
      <div className="absolute right-1 top-1 text-[10px] neon-text-teal font-display">
        {heartRate} BPM
      </div>
    </div>
  );
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] uppercase tracking-wider">
        <span className="text-muted-foreground">{label}</span>
        <span className={color}>{Math.round(value)}%</span>
      </div>
      <div className="h-2 bg-muted/30 rounded-sm overflow-hidden">
        <motion.div
          className="h-full rounded-sm"
          style={{
            background: color.includes('teal')
              ? 'linear-gradient(90deg, hsl(168 100% 40%), hsl(168 100% 50%))'
              : color.includes('amber')
              ? 'linear-gradient(90deg, hsl(40 100% 40%), hsl(40 100% 50%))'
              : 'linear-gradient(90deg, hsl(270 100% 55%), hsl(270 100% 65%))',
            boxShadow: color.includes('teal')
              ? '0 0 8px hsl(168 100% 50% / 0.4)'
              : color.includes('amber')
              ? '0 0 8px hsl(40 100% 50% / 0.4)'
              : '0 0 8px hsl(270 100% 65% / 0.4)',
          }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

const STATE_STATUS: Record<AgentState, { label: string; color: string }> = {
  working: { label: 'ONLINE — WORKING', color: 'neon-text-teal' },
  sleeping: { label: 'SLEEP MODE', color: 'neon-text-purple' },
  learning: { label: 'ONLINE — LEARNING', color: 'neon-text-amber' },
  idle: { label: 'ONLINE — STANDBY', color: 'neon-text-teal' },
  redecorating: { label: 'ONLINE — REDECORATING', color: 'neon-text-purple' },
};

export default function VitalStats({ stats, state, uptime }: VitalStatsProps) {
  const status = STATE_STATUS[state];

  return (
    <div className="panel space-y-3">
      <div className="panel-header">
        <span className="inline-block w-2 h-2 rounded-full bg-neon-green animate-pulse" />
        Vital Telemetry
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <span className={`font-display text-[10px] tracking-widest ${status.color}`}>
          {status.label}
        </span>
        <span className="text-[10px] text-muted-foreground font-display">
          UP {formatUptime(uptime)}
        </span>
      </div>

      {/* ECG */}
      <ECGLine heartRate={stats.heartRate} />

      {/* Stat bars */}
      <StatBar label="Health" value={stats.health} color="neon-text-teal" />
      <StatBar label="Energy" value={stats.energy} color="neon-text-amber" />
      <StatBar label="Cognitive Load" value={stats.cognitive} color="neon-text-purple" />
    </div>
  );
}

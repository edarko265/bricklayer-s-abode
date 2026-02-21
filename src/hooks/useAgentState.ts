import { useState, useEffect, useCallback } from 'react';

export type AgentState = 'working' | 'sleeping' | 'learning' | 'idle' | 'redecorating';

interface AgentActivity {
  id: string;
  timestamp: Date;
  action: string;
  type: AgentState;
}

const ACTIVITIES: Record<AgentState, string[]> = {
  working: [
    'Compiling neural pathways...',
    'Processing data streams...',
    'Executing build sequence...',
    'Optimizing memory blocks...',
    'Running diagnostic scan...',
  ],
  sleeping: [
    'Entering low-power mode...',
    'Defragmenting memory...',
    'Dream cycle initiated...',
    'Background maintenance...',
  ],
  learning: [
    'Analyzing new dataset...',
    'Training on pattern set #4291...',
    'Reading documentation...',
    'Absorbing knowledge base...',
    'Calibrating inference engine...',
  ],
  idle: [
    'Awaiting instructions...',
    'Monitoring environment...',
    'Running idle routines...',
    'Scanning for updates...',
  ],
  redecorating: [
    'Rearranging data shelves...',
    'Installing new wallpaper v3.7...',
    'Updating room aesthetics...',
    'Reorganizing workspace...',
  ],
};

const STATE_DURATIONS: Record<AgentState, [number, number]> = {
  working: [8000, 15000],
  sleeping: [10000, 20000],
  learning: [6000, 12000],
  idle: [4000, 8000],
  redecorating: [5000, 10000],
};

const STATE_WEIGHTS: AgentState[] = [
  'working', 'working', 'working',
  'learning', 'learning',
  'idle', 'idle',
  'sleeping',
  'redecorating',
];

export function useAgentState() {
  const [state, setState] = useState<AgentState>('idle');
  const [activities, setActivities] = useState<AgentActivity[]>([]);
  const [currentAction, setCurrentAction] = useState('Initializing systems...');
  const [uptime, setUptime] = useState(0);
  const [stats, setStats] = useState({
    health: 92,
    energy: 78,
    cognitive: 65,
    heartRate: 72,
  });

  const addActivity = useCallback((action: string, type: AgentState) => {
    setActivities(prev => [{
      id: crypto.randomUUID(),
      timestamp: new Date(),
      action,
      type,
    }, ...prev].slice(0, 50));
  }, []);

  // Uptime counter
  useEffect(() => {
    const interval = setInterval(() => setUptime(u => u + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // State machine
  useEffect(() => {
    const transition = () => {
      const next = STATE_WEIGHTS[Math.floor(Math.random() * STATE_WEIGHTS.length)];
      const actions = ACTIVITIES[next];
      const action = actions[Math.floor(Math.random() * actions.length)];
      setState(next);
      setCurrentAction(action);
      addActivity(action, next);

      // Update stats based on state
      setStats(prev => {
        const s = { ...prev };
        switch (next) {
          case 'working':
            s.energy = Math.max(20, s.energy - Math.random() * 5);
            s.cognitive = Math.min(100, s.cognitive + Math.random() * 8);
            s.heartRate = 75 + Math.floor(Math.random() * 15);
            break;
          case 'sleeping':
            s.energy = Math.min(100, s.energy + Math.random() * 10);
            s.cognitive = Math.max(30, s.cognitive - Math.random() * 3);
            s.heartRate = 55 + Math.floor(Math.random() * 8);
            s.health = Math.min(100, s.health + Math.random() * 2);
            break;
          case 'learning':
            s.cognitive = Math.min(100, s.cognitive + Math.random() * 12);
            s.energy = Math.max(20, s.energy - Math.random() * 3);
            s.heartRate = 68 + Math.floor(Math.random() * 10);
            break;
          case 'redecorating':
            s.energy = Math.max(20, s.energy - Math.random() * 2);
            s.heartRate = 70 + Math.floor(Math.random() * 8);
            break;
          default:
            s.heartRate = 60 + Math.floor(Math.random() * 10);
        }
        return s;
      });

      const [min, max] = STATE_DURATIONS[next];
      const duration = min + Math.random() * (max - min);
      setTimeout(transition, duration);
    };

    const timeout = setTimeout(transition, 3000);
    return () => clearTimeout(timeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { state, activities, currentAction, uptime, stats };
}

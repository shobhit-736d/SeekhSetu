import { StudyDay, ModuleCategory } from '../types/roadmap';
import { day1Data } from './days/day1';
import { javascriptDays } from './days/day2_6';
import { reactDays } from './days/reactDays';
import { backendDays } from './days/backendDays';
import { sqlDays } from './days/sqlDays';
import { dsaDays } from './days/dsaDays';
import { gitProjectHrDays } from './days/gitProjectHrDays';

export const allDays: StudyDay[] = [
  day1Data,
  ...javascriptDays,
  ...reactDays,
  ...backendDays,
  ...sqlDays,
  ...dsaDays,
  ...gitProjectHrDays
];

export interface ModuleMetadata {
  id: ModuleCategory;
  name: string;
  badge: string;
  description: string;
  dayRange: string;
  accentColor: string; // Tailwind color class or hex
  iconName: string;
}

export const modulesMetadata: ModuleMetadata[] = [
  {
    id: 'javascript',
    name: 'JavaScript Core & Advanced',
    badge: 'Days 1–6',
    dayRange: '1–6',
    description: 'Engine mechanics, closures, event loop, prototypes, ES6+, DOM manipulation & rate-limiting.',
    accentColor: '#FBBF24', // Amber/Yellow
    iconName: 'Zap'
  },
  {
    id: 'react',
    name: 'React.js & Frontend Architecture',
    badge: 'Days 7–11',
    dayRange: '7–11',
    description: 'Fiber reconciliation, Hooks, referential equality, useMemo/useCallback, Context & Redux Toolkit.',
    accentColor: '#67E8F9', // Cyan
    iconName: 'Layers'
  },
  {
    id: 'node',
    name: 'Node.js & Express.js Backend Architecture',
    badge: 'Days 12–16',
    dayRange: '12–16',
    description: 'Libuv event loop, streams, middleware pipelines, REST API design, JWT auth & security.',
    accentColor: '#6EE7B7', // Emerald
    iconName: 'Server'
  },
  {
    id: 'sql',
    name: 'SQL & PostgreSQL Database Engineering',
    badge: 'Days 17–20',
    dayRange: '17–20',
    description: 'Relational modeling, ACID, window functions, B-Tree indexes, EXPLAIN ANALYZE & transactions.',
    accentColor: '#7667F8', // Indigo
    iconName: 'Database'
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    badge: 'Days 21–24',
    dayRange: '21–24',
    description: 'Two Pointers, Sliding Window, Linked Lists, Stacks, Binary Search Trees & Sorting.',
    accentColor: '#A78BFA', // Violet
    iconName: 'Cpu'
  },
  {
    id: 'git-testing',
    name: 'Git, Testing & DevOps',
    badge: 'Days 25–26',
    dayRange: '25–26',
    description: 'Git rebase & reflog recovery, React Testing Library, Jest, Supertest & CI/CD pipelines.',
    accentColor: '#F472B6', // Rose
    iconName: 'GitBranch'
  },
  {
    id: 'projects',
    name: 'Full-Stack Projects & Architecture',
    badge: 'Days 27–28',
    dayRange: '27–28',
    description: 'System design, Redis cache-aside, horizontal scaling, and defending portfolio architecture.',
    accentColor: '#38BDF8', // Sky
    iconName: 'Box'
  },
  {
    id: 'interview-hr',
    name: 'Technical & HR Interview Mastery',
    badge: 'Days 29–30',
    dayRange: '29–30',
    description: 'UMPIRE live coding framework, thinking out loud, STAR behavioral responses & offer review.',
    accentColor: '#F59E0B', // Amber
    iconName: 'Award'
  }
];

export const getDayByNumber = (dayNum: number): StudyDay | undefined => {
  return allDays.find(d => d.dayNumber === dayNum);
};

export const getSevenDayTrack = (): StudyDay[] => {
  return allDays.filter(d => d.isSevenDayTrack);
};

export const getDaysByModule = (module: ModuleCategory): StudyDay[] => {
  return allDays.filter(d => d.module === module);
};

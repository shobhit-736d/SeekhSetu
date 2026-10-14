import React, { useState, useEffect, useRef } from 'react';
import {
Terminal, Cpu, Code2, Database, GitBranch, BookOpen, Clock, Award,
CheckCircle2, Circle, Star, Flame, BarChart2, Settings, Search, Filter,
ArrowRight, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, HelpCircle,
ChevronRight, ChevronDown, Check, X, AlertCircle, Copy, RefreshCw, Layers,
Compass, Send, MessageSquare, Bookmark, ExternalLink, ShieldCheck, Zap
} from 'lucide-react';
import {
AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
​// ==========================================
// TYPES & INTERFACES
// ==========================================
​type TabType = 'dashboard' | 'roadmap' | 'workspace' | 'practice' | 'focus' | 'revision' | 'analytics';
​interface StudyDay {
id: number;
title: string;
module: string;
duration: string;
completed: boolean;
starred: boolean;
summary: string;
}
​interface Flashcard {
id: string;
question: string;
answer: string;
category: string;
mastery: 1 | 2 | 3 | 4; // 1: Unfamiliar, 2: Learning, 3: Familiar, 4: Mastered
}
​interface QuizQuestion {
id: string;
question: string;
options: string[];
correct: number;
explanation: string;
topic: string;
}
​// ==========================================
// MOCK DATA & CURRICULUM
// ==========================================
​const MODULES = [
{ name: 'JavaScript Core & Advanced', days: [1, 2, 3, 4, 5, 6] },
{ name: 'React.js & Frontend Architecture', days: [7, 8, 9, 10, 11] },
{ name: 'Node.js & Express.js Backend', days: [12, 13, 14, 15, 16] },
{ name: 'SQL & PostgreSQL Engineering', days: [17, 18, 19, 20] },
{ name: 'Data Structures & Algorithms', days: [21, 22, 23, 24] },
{ name: 'Git, Testing & DevOps', days: [25, 26] },
{ name: 'Full-Stack Projects & Architecture', days: [27, 28] },
{ name: 'Technical & HR Interview Mastery', days: [29, 30] },
];
​const INITIAL_DAYS: StudyDay[] = [
{ id: 1, title: 'JS Engine, Execution Context & Hoisting', module: 'JavaScript Core & Advanced', duration: '90m', completed: true, starred: true, summary: 'Deep dive into Call Stack, Memory Heap, Lexical Environments, and Variable Hoisting.' },
{ id: 2, title: 'Closures, Scope Chain & Closures in Depth', module: 'JavaScript Core & Advanced', duration: '120m', completed: true, starred: false, summary: 'Lexical scoping, closure memory retention, module patterns, and private variables.' },
{ id: 3, title: 'Prototypes, Prototypal Inheritance & Classes', module: 'JavaScript Core & Advanced', duration: '100m', completed: false, starred: true, summary: 'Prototype chains, Object.create, constructor functions, and ES6 class sugar.' },
{ id: 4, title: 'Asynchronous JS: Event Loop, Microtasks & Promises', module: 'JavaScript Core & Advanced', duration: '110m', completed: false, starred: true, summary: 'Call Stack vs Callback Queue vs Microtask Queue, Promise resolution, async/await.' },
{ id: 5, title: 'Advanced JS: Generators, Iterators & Proxies', module: 'JavaScript Core & Advanced', duration: '90m', completed: false, starred: false, summary: 'Lazy evaluation with generators, custom iterators, and meta-programming with Proxies.' },
{ id: 6, title: 'JS Performance & Memory Leak Prevention', module: 'JavaScript Core & Advanced', duration: '80m', completed: false, starred: false, summary: 'Garbage collection algorithms, detached DOM nodes, and memory profiling.' },
{ id: 7, title: 'React 19 Core: Fiber Architecture & Reconciliation', module: 'React.js & Frontend Architecture', duration: '120m', completed: false, starred: true, summary: 'Virtual DOM, Fiber node structures, commit and render phases, concurrent rendering.' },
{ id: 8, title: 'Custom Hooks, Context & Advanced State Design', module: 'React.js & Frontend Architecture', duration: '100m', completed: false, starred: false, summary: 'Building decoupled custom hooks, performance optimization with useMemo/useCallback.' },
{ id: 9, title: 'Server Components, Actions & Suspense', module: 'React.js & Frontend Architecture', duration: '110m', completed: false, starred: true, summary: 'RSC mental model, client-server boundary, useActionState, and suspense streaming.' },
{ id: 10, title: 'State Management at Scale: Zustand & Redux Toolkit', module: 'React.js & Frontend Architecture', duration: '90m', completed: false, starred: false, summary: 'Atomic vs global stores, immutability in reducers, middleware configuration.' },
{ id: 11, title: 'Frontend Testing & Performance Optimization', module: 'React.js & Frontend Architecture', duration: '90m', completed: false, starred: false, summary: 'React Testing Library, Jest mocks, bundle splitting, Web Vitals optimization.' },
{ id: 12, title: 'Node.js Internals: Libuv, Event Loop & Streams', module: 'Node.js & Express.js Backend', duration: '120m', completed: false, starred: true, summary: 'Node thread pool, 6 phases of libuv event loop, readable/writable streams.' },
{ id: 13, title: 'Express.js Architecture, Middleware & Error Handling', module: 'Node.js & Express.js Backend', duration: '100m', completed: false, starred: false, summary: 'Request lifecycle, custom middleware chains, centralized async error boundaries.' },
{ id: 14, title: 'Authentication, JWT, OAuth 2.0 & Refresh Tokens', module: 'Node.js & Express.js Backend', duration: '110m', completed: false, starred: true, summary: 'Stateless JWT verification, cookie security (HttpOnly, SameSite), secure rotation.' },
{ id: 15, title: 'WebSockets, Real-time Comm & Socket.io', module: 'Node.js & Express.js Backend', duration: '90m', completed: false, starred: false, summary: 'Persistent bidirectional channels, rooms, namespaces, reconnection strategies.' },
{ id: 16, title: 'Microservices, API Gateways & Redis Caching', module: 'Node.js & Express.js Backend', duration: '120m', completed: false, starred: false, summary: 'Service discovery, rate limiting with Redis token bucket, event-driven architecture.' },
{ id: 17, title: 'PostgreSQL Advanced: Indexing & Query Tuning', module: 'SQL & PostgreSQL Database Engineering', duration: '110m', completed: false, starred: true, summary: 'B-Tree vs GIN/GiST indexes, EXPLAIN ANALYZE, query execution plans.' },
{ id: 18, title: 'Transactions, ACID Properties & Concurrency Control', module: 'SQL & PostgreSQL Database Engineering', duration: '100m', completed: false, starred: false, summary: 'Isolation levels, deadlocks, MVCC, row-level locking mechanisms.' },
{ id: 19, title: 'NoSQL Mastery: MongoDB Aggregation Pipelines', module: 'SQL & PostgreSQL Database Engineering', duration: '90m', completed: false, starred: false, summary: 'Document schema design, indexing, complex aggregation stages ($lookup, $facet).' },
{ id: 20, title: 'Database Migration Strategies & ORM Tuning', module: 'SQL & PostgreSQL Database Engineering', duration: '90m', completed: false, starred: false, summary: 'Zero-downtime migrations, Prisma/Drizzle ORM query optimization.' },
{ id: 21, title: 'Arrays, Strings & Two-Pointer Patterns', module: 'Data Structures & Algorithms', duration: '100m', completed: false, starred: false, summary: 'Sliding window, prefix sums, fast & slow pointers with time complexity analysis.' },
{ id: 22, title: 'Linked Lists, Stacks & Queues', module: 'Data Structures & Algorithms', duration: '100m', completed: false, starred: false, summary: 'Reversing linked lists, monotonic stacks, LRU Cache implementation.' },
{ id: 23, title: 'Trees, Graphs, BFS & DFS Traversals', module: 'Data Structures & Algorithms', duration: '120m', completed: false, starred: true, summary: 'Binary search trees, lowest common ancestor, Dijkstra shortest path algorithm.' },
{ id: 24, title: 'Dynamic Programming & Memoization', module: 'Data Structures & Algorithms', duration: '120m', completed: false, starred: true, summary: 'Knapsack problem, longest common subsequence, tabulation vs memoization.' },
{ id: 25, title: 'Advanced Git Workflows & CI/CD Pipelines', module: 'Git, Testing & DevOps', duration: '90m', completed: false, starred: false, summary: 'Interactive rebasing, cherry-picking, GitHub Actions workflow automation.' },
{ id: 26, title: 'Docker, Kubernetes & Cloud Deployment', module: 'Git, Testing & DevOps', duration: '110m', completed: false, starred: false, summary: 'Containerizing full-stack apps, multi-stage builds, pods, and ingress routing.' },
{ id: 27, title: 'Full-Stack System Design: Scalable Architecture', module: 'Full-Stack Projects & Architecture', duration: '130m', completed: false, starred: true, summary: 'Load balancing, CDN caching, database sharding, caching layers design.' },
{ id: 28, title: 'Building a Production-Grade SaaS End-to-End', module: 'Full-Stack Projects & Architecture', duration: '150m', completed: false, starred: false, summary: 'Stripe webhooks integration, logging, monitoring with Datadog/Sentry.' },
{ id: 29, title: 'System Design Interview Masterclass', module: 'Technical & HR Interview Mastery', duration: '100m', completed: false, starred: true, summary: 'Back-of-envelope estimation, trade-off analysis, structuring architectural answers.' },
{ id: 30, title: 'Behavioral Interviews & Salary Negotiation', module: 'Technical & HR Interview Mastery', duration: '80m', completed: false, starred: false, summary: 'STAR method framework, leadership principles, compensation negotiation tactics.' },
];
​const INITIAL_FLASHCARDS: Flashcard[] = [
{ id: 'f1', question: 'What is the difference between microtask queue and callback queue in JavaScript?', answer: 'The microtask queue (promises, queueMicrotask) has higher priority and is cleared entirely after every single callback execution in the call stack before the event loop moves to the callback (task) queue (setTimeout, DOM events).', category: 'JavaScript Core', mastery: 3 },
{ id: 'f2', question: 'How does React Fiber enable interruptible rendering?', answer: 'React Fiber breaks rendering work into incremental units (fibers). By using requestIdleCallback or requestAnimationFrame scheduling, it can pause work to handle high-priority browser events (like user typing or animations) and resume later.', category: 'React 19', mastery: 2 },
{ id: 'f3', question: 'What is MVCC in PostgreSQL and how does it prevent blocking?', answer: 'Multi-Version Concurrency Control (MVCC) ensures every transaction sees a snapshot of data at a specific point in time. Writers do not block readers and readers do not block writers because updates create new data versions rather than overwriting in place.', category: 'Databases', mastery: 1 },
{ id: 'f4', question: 'Explain the 6 phases of the Node.js libuv event loop.', answer: '1. Timers (setTimeout/setInterval), 2. Pending callbacks (I/O callbacks deferred), 3. Idle, prepare (internal), 4. Poll (retrieve new I/O events), 5. Check (setImmediate), 6. Close callbacks (e.g., socket.on('close')).', category: 'Node.js', mastery: 4 },
];
​const INITIAL_QUIZZES: QuizQuestion[] = [
{
id: 'q1',
question: 'What will be the output of: console.log(typeof typeof 1);',
options: ['"number"', '"string"', '"undefined"', '"object"'],
correct: 1,
explanation: 'typeof 1 evaluates to "string" ("number"). Then typeof "string" evaluates to "string".',
topic: 'JavaScript Operators'
},
{
id: 'q2',
question: 'In React 19, what is the primary purpose of the useActionState hook?',
options: [
'To manage global client state like Redux',
'To handle form actions with automatic pending states and server response integration',
'To cache expensive calculations between renders',
'To memoize DOM node references'
],
correct: 1,
explanation: 'useActionState allows updating state based on the result of a form action, simplifying loading states and error handling.',
topic: 'React 19 Hooks'
},
{
id: 'q3',
question: 'Which PostgreSQL index type is optimal for high-cardinality equality and range queries?',
options: ['HASH', 'GIN', 'B-Tree', 'BRIN'],
correct: 2,
explanation: 'B-Tree is the default and most versatile index type in PostgreSQL, perfectly suited for equality and range operations.',
topic: 'PostgreSQL Indexing'
}
];
​const WEEKLY_STUDY_DATA = [
{ day: 'Mon', hours: 2.5 },
{ day: 'Tue', hours: 3.2 },
{ day: 'Wed', hours: 1.8 },
{ day: 'Thu', hours: 4.0 },
{ day: 'Fri', hours: 3.5 },
{ day: 'Sat', hours: 5.0 },
{ day: 'Sun', hours: 4.2 },
];
​const MODULE_DISTRIBUTION = [
{ name: 'JavaScript', hours: 18, color: '#7667F8' },
{ name: 'React', hours: 15, color: '#67E8F9' },
{ name: 'Node.js', hours: 14, color: '#A78BFA' },
{ name: 'Databases', hours: 10, color: '#6EE7B7' },
{ name: 'DSA & Systems', hours: 16, color: '#FBBF24' },
];
​// ==========================================
// MAIN COMPONENT
// ==========================================
​export default function App() {
const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
const [days, setDays] = useState<StudyDay[]>(INITIAL_DAYS);
const [selectedDayId, setSelectedDayId] = useState<number>(1);
const [flashcards, setFlashcards] = useState<Flashcard[]>(INITIAL_FLASHCARDS);
const [notes, setNotes] = useState<Record<number, string>>({
1: 'Remember: Execution Context has Memory Creation phase (hoisting) and Code Execution phase.'
});
const [searchQuery, setSearchQuery] = useState('');
const [filterModule, setFilterModule] = useState('All');
const [filterStatus, setFilterStatus] = useState('All');
​// Focus Timer States
const [focusTime, setFocusTime] = useState<number>(25 * 60);
const [isFocusRunning, setIsFocusRunning] = useState<boolean>(false);
const [focusMode, setFocusMode] = useState<'study' | 'break'>('study');
const [dailyTargetMinutes, setDailyTargetMinutes] = useState<number>(120);
const [todayStudiedMinutes, setTodayStudiedMinutes] = useState<number>(85);
​// AI Coach States
const [aiChatOpen, setAiChatOpen] = useState<boolean>(false);
const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
{ sender: 'ai', text: 'Hello! I am your SeekhSetu AI Technical Coach. Ask me anything about JavaScript engines, React 19 architecture, or system design interview prep!' }
]);
const [chatInput, setChatInput] = useState<string>('');
​// Active Flashcard Index
const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
​// Focus Timer Effect
useEffect(() => {
let interval: any = null;
if (isFocusRunning && focusTime > 0) {
interval = setInterval(() => {
setFocusTime((prev) => prev - 1);
}, 1000);
} else if (focusTime === 0) {
setIsFocusRunning(false);
if (focusMode === 'study') {
setTodayStudiedMinutes((prev) => prev + 25);
}
}
return () => clearInterval(interval);
}, [isFocusRunning, focusTime, focusMode]);
​const formatTimer = (seconds: number) => {
const mins = Math.floor(seconds / 60);
const secs = seconds % 60;
return ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')};
};
​const toggleDayCompletion = (id: number) => {
setDays(days.map(d => d.id === id ? { ...d, completed: !d.completed } : d));
};
​const toggleDayStar = (id: number) => {
setDays(days.map(d => d.id === id ? { ...d, starred: !d.starred } : d));
};
​const handleSendMessage = () => {
if (!chatInput.trim()) return;
const userMsg = chatInput;
setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
setChatInput('');
setTimeout(() => {
let reply = "That's a fantastic architectural question! For Full Stack Associate interviews, make sure you emphasize concurrency models, memory overhead, and edge-case error boundaries.";
if (userMsg.toLowerCase().includes('closure')) {
reply = "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In interviews, mention how it keeps outer variables alive even after the outer function has returned!";
} else if (userMsg.toLowerCase().includes('fiber')) {
reply = "React 19 and Fiber handle reconciliation by breaking work into units. This allows yielding back to the main thread so heavy renders don't block user input.";
}
setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
}, 800);
};
​const selectedDayData = days.find(d => d.id === selectedDayId) || days[0];
const completedCount = days.filter(d => d.completed).length;
const progressPercentage = Math.round((completedCount / days.length) * 100);
​return (
<div className="min-h-screen bg-[#090B14] text-[#F5F7FF] font-sans antialiased selection:bg-[#7667F8]/30 selection:text-[#67E8F9] flex flex-col">
​{/* TOP NAVIGATION HEADER */}
<header className="h-16 border-b border-[#94a3b8]/15 bg-[#0D1120]/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
<div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
<div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7667F8] to-[#67E8F9] flex items-center justify-center shadow-lg shadow-[#7667F8]/20">
<Compass className="w-5 h-5 text-[#090B14]" />
</div>
<div>
<h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-[#F5F7FF] via-[#A78BFA] to-[#67E8F9] bg-clip-text text-transparent">
SeekhSetu
</h1>
<p className="text-[10px] text-[#A1ABC0] tracking-widest uppercase font-mono">Learn Today Lead Tomorrow</p>
</div>
</div>
​{/* NAVIGATION TABS */}
<nav className="hidden md:flex items-center space-x-1 bg-[#14192A] p-1 rounded-xl border border-[#94a3b8]/14">
{[
{ id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
{ id: 'roadmap', label: 'Roadmap', icon: Layers },
{ id: 'workspace', label: 'Workspace', icon: Code2 },
{ id: 'practice', label: 'Practice & Flashcards', icon: Zap },
{ id: 'focus', label: 'Focus Timer', icon: Clock },
{ id: 'revision', label: 'Revision Center', icon: Bookmark },
{ id: 'analytics', label: 'Analytics', icon: Cpu },
].map((tab) => {
const Icon = tab.icon;
const isActive = currentTab === tab.id;
return (
<button
key={tab.id}
onClick={() => setCurrentTab(tab.id as TabType)}
className={flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${ isActive  ? 'bg-[#7667F8] text-white shadow-md shadow-[#7667F8]/30'  : 'text-[#A1ABC0] hover:text-[#F5F7FF] hover:bg-[#090B14]/40' }}
>
<Icon className="w-3.5 h-3.5" />
<span>{tab.label}</span>
</button>
);
})}
</nav>
​{/* RIGHT HEADER ACTIONS */}
<div className="flex items-center space-x-4">
<div className="hidden lg:flex items-center space-x-2 bg-[#14192A] px-3 py-1.5 rounded-lg border border-[#94a3b8]/14 text-xs">
<Flame className="w-4 h-4 text-[#FBBF24]" />
<span className="font-mono font-bold text-[#F5F7FF]">Day 7 Streak</span>
</div>
​<button
onClick={() => setAiChatOpen(!aiChatOpen)}
className="flex items-center space-x-2 bg-gradient-to-r from-[#7667F8]/20 to-[#A78BFA]/20 border border-[#7667F8]/40 hover:border-[#7667F8] px-3.5 py-1.5 rounded-xl text-xs font-medium text-[#67E8F9] transition-all shadow-sm"
>
<Sparkles className="w-4 h-4 text-[#67E8F9]" />
<span className="hidden sm:inline">AI Coach</span>
</button>
</div>
</header>
​{/* MAIN CONTENT AREA */}
<main className="flex-1 overflow-y-auto">
​{/* ================= DASHBOARD TAB ================= */}
{currentTab === 'dashboard' && (
<div className="max-w-7xl mx-auto p-6 space-y-8 animate-fadeIn">
​{/* Editorial Welcome Banner */}
<div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#14192A] via-[#0D1120] to-[#14192A] border border-[#94a3b8]/14 p-8 shadow-xl">
<div className="absolute right-0 top-0 w-96 h-96 bg-[#7667F8]/10 rounded-full blur-3xl pointer-events-none" />
<div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
<div>
<div className="inline-flex items-center space-x-2 bg-[#7667F8]/10 text-[#7667F8] px-3 py-1 rounded-full text-xs font-mono mb-3 border border-[#7667F8]/30">
<Sparkles className="w-3.5 h-3.5" />
<span>Full Stack Associate Curriculum</span>
</div>
<h2 className="text-3xl font-bold tracking-tight text-[#F5F7FF] mb-2">
Welcome back, Developer. Ready to lead?
</h2>
<p className="text-[#A1ABC0] text-sm max-w-2xl">
You have completed <span className="text-[#6EE7B7] font-semibold">{completedCount} of {days.length}</span> technical modules. Your next milestone is mastering <span className="text-[#67E8F9] font-mono">Day {selectedDayId}: {selectedDayData.title}</span>.
</p>
</div>
<button
onClick={() => setCurrentTab('workspace')}
className="flex items-center space-x-2 bg-[#7667F8] hover:bg-[#6555E5] text-white px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-lg shadow-[#7667F8]/30 group"
>
<span>Continue Learning</span>
<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</button>
</div>
</div>
​{/* Asymmetric Metric Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
{[
{ label: 'Today Study Time', value: ${todayStudiedMinutes} mins, sub: Target: ${dailyTargetMinutes}m, icon: Clock, color: 'text-[#67E8F9]' },
{ label: 'Weekly Study Duration', value: '24.5 hrs', sub: '+18% vs last week', icon: BarChart2, color: 'text-[#7667F8]' },
{ label: 'Curriculum Progress', value: ${progressPercentage}%, sub: ${completedCount} of 30 days, icon: Award, color: 'text-[#6EE7B7]' },
{ label: 'Quiz Accuracy', value: '94.2%', sub: 'Based on 42 quizzes', icon: ShieldCheck, color: 'text-[#FBBF24]' },
].map((metric, i) => {
const Icon = metric.icon;
return (
<div key={i} className="bg-[#14192A] border border-[#94a3b8]/14 rounded-2xl p-5 hover:border-[#7667F8]/40 transition-all">
<div className="flex items-center justify-between mb-3">
<span className="text-xs font-medium text-[#A1ABC0]">{metric.label}</span>
<div className={p-2 rounded-xl bg-[#090B14] ${metric.color}}>
<Icon className="w-4 h-4" />
</div>
</div>
<div className="text-2xl font-bold font-mono text-[#F5F7FF] mb-1">{metric.value}</div>
<div className="text-[11px] text-[#A1ABC0]">{metric.sub}</div>
</div>
);
})}
</div>
​{/* Two Column Section: Roadmap Preview & Focus Engine */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
​{/* Visual Roadmap Preview */}
<div className="lg:col-span-2 bg-[#14192A] border border-[#94a3b8]/14 rounded-2xl p-6 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<h3 className="font-bold text-base text-[#F5F7FF] flex items-center space-x-2">
<Layers className="w-4 h-4 text-[#7667F8]" />
<span>Roadmap Progress Overview</span>
</h3>
<button onClick={() => setCurrentTab('roadmap')} className="text-xs text-[#7667F8] hover:underline font-medium">
View All 30 Days →
</button>
</div>
<div className="space-y-3">
{MODULES.slice(0, 4).map((mod, index) => {
const modDays = days.filter(d => mod.days.includes(d.id));
const modCompleted = modDays.filter(d => d.completed).length;
const modPercent = Math.round((modCompleted / modDays.length) * 100);
return (
<div key={index} className="bg-[#090B14]/60 p-3.5 rounded-xl border border-[#94a3b8]/10">
<div className="flex justify-between items-center mb-1.5 text-xs">
<span className="font-medium text-[#F5F7FF]">{mod.name}</span>
<span className="font-mono text-[#A1ABC0]">{modCompleted}/{modDays.length} Days</span>
</div>
<div className="w-full bg-[#14192A] h-2 rounded-full overflow-hidden">
<div className="bg-gradient-to-r from-[#7667F8] to-[#67E8F9] h-full rounded-full transition-all duration-500" style={{ width: ${modPercent}% }} />
</div>
</div>
);
})}
</div>
</div>
</div>
​{/* Interactive Focus Engine Widget */}
<div className="bg-[#14192A] border border-[#94a3b8]/14 rounded-2xl p-6 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<h3 className="font-bold text-base text-[#F5F7FF] flex items-center space-x-2">
<Clock className="w-4 h-4 text-[#67E8F9]" />
<span>Focus Engine</span>
</h3>
<span className="text-xs font-mono text-[#6EE7B7] bg-[#6EE7B7]/10 px-2 py-0.5 rounded">Active Session</span>
</div>
<div className="flex flex-col items-center justify-center py-6">
<div className="text-5xl font-extrabold font-mono text-[#F5F7FF] tracking-wider mb-2">
{formatTimer(focusTime)}
</div>
<p className="text-xs text-[#A1ABC0] mb-6">Deep work session: JavaScript Engines</p>
<div className="flex items-center space-x-3">
<button
onClick={() => setIsFocusRunning(!isFocusRunning)}
className={px-6 py-2.5 rounded-xl font-medium text-xs flex items-center space-x-2 transition-all ${ isFocusRunning  ? 'bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/40 hover:bg-[#FBBF24]/30'  : 'bg-[#7667F8] text-white hover:bg-[#6555E5] shadow-lg shadow-[#7667F8]/30' }}
>
{isFocusRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
<span>{isFocusRunning ? 'Pause Session' : 'Start Focus'}</span>
</button>
<button
onClick={() => { setIsFocusRunning(false); setFocusTime(25 * 60); }}
className="p-2.5 rounded-xl bg-[#090B14] border border-[#94a3b8]/14 text-[#A1ABC0] hover:text-[#F5F7FF]"
>
<RotateCcw className="w-4 h-4" />
</button>
</div>
</div>
</div>
<button
onClick={() => setCurrentTab('focus')}
className="w-full text-center text-xs text-[#A1ABC0] hover:text-[#7667F8] pt-2 border-t border-[#94a3b8]/10 transition-colors"
>
Open Full Focus Timer Suite →
</button>
</div>
​</div>
​</div>
)}
​{/* ================= ROADMAP TAB ================= */}
{currentTab === 'roadmap' && (
<div className="max-w-7xl mx-auto p-6 space-y-6 animate-fadeIn">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#14192A] border border-[#94a3b8]/14 p-6 rounded-2xl">
<div>
<h2 className="text-2xl font-bold text-[#F5F7FF]">30-Day Technical Curriculum</h2>
<p className="text-xs text-[#A1ABC0] mt-1">Engineered for Full Stack Developer Associate interviews at top-tier product companies.</p>
</div>
<div className="flex items-center space-x-3 w-full md:w-auto">
<div className="relative flex-1 md:w-64">
<Search className="w-4 h-4 text-[#A1ABC0] absolute left-3 top-2.5" />
<input
type="text"
placeholder="Search topics..."
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
className="w-full bg-[#090B14] border border-[#94a3b8]/20 rounded-xl pl-9 pr-4 py-2 text-xs text-[#F5F7FF] focus:outline-none focus:border-[#7667F8]"
/>
</div>
</div>
</div>
​{/* Modules List */}
<div className="space-y-6">
{MODULES.map((mod, modIdx) => {
const modDays = days.filter(d => mod.days.includes(d.id)).filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()));
if (modDays.length === 0) return null;
​return (
<div key={modIdx} className="bg-[#14192A] border border-[#94a3b8]/14 rounded-2xl p-6">
<h3 className="font-bold text-base text-[#F5F7FF] mb-4 flex items-center space-x-2">
<span className="w-2 h-2 rounded-full bg-[#7667F8]" />
<span>{mod.name}</span>
</h3>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{modDays.map((day) => (
<div
key={day.id}
onClick={() => { setSelectedDayId(day.id); setCurrentTab('workspace'); }}
className="bg-[#090B14] border border-[#94a3b8]/10 hover:border-[#7667F8]/50 rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between group"
>
<div>
<div className="flex justify-between items-start mb-2">
<span className="text-[10px] font-mono text-[#67E8F9] bg-[#67E8F9]/10 px-2 py-0.5 rounded">
Day {day.id} • {day.duration}
</span>
<div className="flex items-center space-x-2">
<button
onClick={(e) => { e.stopPropagation(); toggleDayStar(day.id); }}
className={p-1 rounded ${day.starred ? 'text-[#FBBF24]' : 'text-[#A1ABC0] hover:text-[#FBBF24]'}}
>
<Star className="w-3.5 h-3.5 fill-current" />
</button>
<button
onClick={(e) => { e.stopPropagation(); toggleDayCompletion(day.id); }}
className={p-1 rounded ${day.completed ? 'text-[#6EE7B7]' : 'text-[#A1ABC0]'}}
>
{day.completed ? <CheckCircle2 className="w-4 h-4 fill-current text-[#6EE7B7]/20 text-[#6EE7B7]" /> : <Circle className="w-4 h-4" />}
</button>
</div>
</div>
<h4 className="font-semibold text-sm text-[#F5F7FF] group-hover:text-[#67E8F9] transition-colors mb-2">
{day.title}
</h4>
<p className="text-xs text-[#A1ABC0] line-clamp-2">{day.summary}</p>
</div>
<div className="mt-4 pt-3 border-t border-[#94a3b8]/10 flex justify-between items-center text-xs text-[#7667F8] font-medium">
<span>Open Workspace</span>
<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
</div>
</div>
))}
</div>
</div>
);
})}
</div>
</div>
)}
​{/* ================= WORKSPACE TAB ================= */}
{currentTab === 'workspace' && (
<div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fadeIn">
​{/* Sidebar Topic Navigator */}
<div className="lg:col-span-1 bg-[#14192A] border border-[#94a3b8]/14 rounded-2xl p-4 h-[calc(100vh-7rem)] overflow-y-auto">
<h3 className="font-bold text-xs uppercase tracking-wider text-[#A1ABC0] mb-3 px-2">Curriculum Navigation</h3>
<div className="space-y-1">
{days.map((day) => (
<button
key={day.id}
onClick={() => setSelectedDayId(day.id)}
className={w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${ selectedDayId === day.id  ? 'bg-[#7667F8] text-white font-medium shadow-md shadow-[#7667F8]/20'  : 'text-[#A1ABC0] hover:bg-[#090B14] hover:text-[#F5F7FF]' }}
>
<div className="flex items-center space-x-2 truncate">
<span className="font-mono text-[10px]">D{day.id}</span>
<span className="truncate">{day.title}</span>
</div>
{day.completed && <CheckCircle2 className="w-3.5 h-3.5 text-[#6EE7B7] flex-shrink-0" />}
</button>
))}
</div>
</div>
​{/* Main Lesson Workspace */}
<div className="lg:col-span-3 bg-[#14192A] border border-[#94a3b8]/14 rounded-2xl p-8 space-y-8">
​{/* Header */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#94a3b8]/14">
<div>
<div className="flex items-center space-x-2 text-xs font-mono text-[#67E8F9] mb-2">
<span>{selectedDayData.module}</span>
<span>•</span>
<span>Day {selectedDayData.id} ({selectedDayData.duration})</span>
</div>
<h2 className="text-2xl font-bold text-[#F5F7FF]">{selectedDayData.title}</h2>
</div>
<div className="flex items-center space-x-3">
<button
onClick={() => toggleDayCompletion(selectedDayData.id)}
className={flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${ selectedDayData.completed  ? 'bg-[#6EE7B7]/20 text-[#6EE7B7] border border-[#6EE7B7]/40'  : 'bg-[#090B14] text-[#A1ABC0] border border-[#94a3b8]/20 hover:text-[#F5F7FF]' }}
>
<CheckCircle2 className="w-4 h-4" />
<span>{selectedDayData.completed ? 'Completed' : 'Mark as Complete'}</span>
</button>
</div>
</div>
​{/* Lesson Content Sections */}
<div className="space-y-6 text-sm text-[#A1ABC0] leading-relaxed">
<div>
<h3 className="text-base font-bold text-[#F5F7FF] mb-2 flex items-center space-x-2">
<Terminal className="w-4 h-4 text-[#7667F8]" />
<span>Core Architecture & Deep Dive</span>
</h3>
<p className="mb-4">
{selectedDayData.summary} When preparing for Full Stack Developer Associate interviews, interviewers heavily probe underlying engine behavior rather than surface syntax.
</p>
​{/* Interactive Code Snippet */}
<div className="bg-[#090B14] rounded-xl border border-[#94a3b8]/20 p-4 font-mono text-xs overflow-x-auto relative group">
<div className="absolute right-3 top-3 text-[10px] text-[#A1ABC0] bg-[#14192A] px-2 py-1 rounded">JavaScript</div>
<pre className="text-[#67E8F9]">{`// Execution Context & Scope Chain Example
let globalVar = "SeekhSetu Production";
​function outerFunction(outerArg) {
let outerVar = "Closure Memory";
return function innerFunction(innerArg) {
console.log(`${globalVar} | ${outerVar} | ${innerArg}`);
};
}
​const closureRef = outerFunction("Associate");
closureRef("Interview Prep"); // Output: SeekhSetu Production | Closure Memory | Interview Prep`}</pre>
</div>
</div>
​{/* Common Pitfalls & Interview Q&A */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="bg-[#090B14]/60 border border-[#94a3b8]/10 p-5 rounded-xl">
<h4 className="font-bold text-xs uppercase tracking-wider text-[#FBBF24] mb-2">Common Interview Pitfalls</h4>
<p className="text-xs text-[#A1ABC0]">Assuming closures store snapshots of variables rather than living references to lexical environment variables in memory.</p>
</div>
<div className="bg-[#090B14]/60 border border-[#94a3b8]/10 p-5 rounded-xl">
<h4 className="font-bold text-xs uppercase tracking-wider text-[#6EE7B7] mb-2">High-Yield Interview Key Point</h4>
<p className="text-xs text-[#A1ABC0]">Be prepared to write polyfills for bind, call, apply, and Promises from scratch under 5 minutes.</p>
</div>
</div>
​{/* Personal Notes Section */}
<div className="bg-[#090B14]/60 border border-[#94a3b8]/10 p-5 rounded-xl">
<h4 className="font-bold text-xs text-[#F5F7FF] mb-2 flex items-center space-x-2">
<Bookmark className="w-3.5 h-3.5 text-[#7667F8]" />
<span>Personal Mnemonic & Notes</span>
</h4>
<textarea
rows={3}
value={notes[selectedDayId] || ''}
onChange={(e) => setNotes({ ...notes, [selectedDayId]: e.target.value })}
placeholder="Type your personal revision notes here..."
className="w-full bg-[#14192A] border border-[#94a3b8]/20 rounded-xl p-3 text-xs text-[#F5F7FF] focus:outline-none focus:border-[#7667F8]"
/>
</div>
​</div>
​</div>
​</div>
)}
​{/* ================= PRACTICE & FLASHCARDS TAB ================= */}
{currentTab === 'practice' && (
<div className="max-w-5xl mx-auto p-6 space-y-8 animate-fadeIn">
<div className="text-center max-w-xl mx-auto">
<h2 className="text-2xl font-bold text-[#F5F7FF] mb-2">3D Active Recall & Flashcards</h2>
<p className="text-xs text-[#A1ABC0]">Master high-yield technical interview concepts using spaced repetition and active recall.</p>
</div>
​{/* 3D Flashcard Container */}
<div className="max-w-xl mx-auto">
<div
onClick={() => setIsCardFlipped(!isCardFlipped)}
className="bg-[#14192A] border border-[#7667F8]/30 hover:border-[#7667F8] rounded-2xl p-8 min-h-[260px] flex flex-col justify-between cursor-pointer transition-all shadow-xl shadow-[#7667F8]/10 relative group"
>
<div className="flex justify-between items-center text-xs text-[#A1ABC0]">
<span className="font-mono bg-[#7667F8]/10 text-[#7667F8] px-2.5 py-1 rounded">
{flashcards[activeCardIndex].category}
</span>
<span>Card {activeCardIndex + 1} of {flashcards.length} (Click to Flip)</span>
</div>
​<div className="py-8 text-center">
<h3 className="text-lg font-semibold text-[#F5F7FF]">
{isCardFlipped ? flashcards[activeCardIndex].answer : flashcards[activeCardIndex].question}
</h3>
<p className="text-[10px] text-[#A1ABC0] mt-3 font-mono">
{isCardFlipped ? '💡 Answer Revealed' : '❓ Question (Click to reveal answer)'}
</p>
</div>
​<div className="flex justify-between items-center pt-4 border-t border-[#94a3b8]/10 text-xs">
<button
onClick={(e) => { e.stopPropagation(); setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1)); setIsCardFlipped(false); }}
className="text-[#A1ABC0] hover:text-[#F5F7FF]"
>
← Previous
</button>
<span className="text-xs font-mono text-[#6EE7B7]">Mastery: Level {flashcards[activeCardIndex].mastery} / 4</span>
<button
onClick={(e) => { e.stopPropagation(); setActiveCardIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : 0)); setIsCardFlipped(false); }}
className="text-[#7667F8] hover:underline font-medium"
>
Next →
</button>
</div>
</div>
</div>
​</div>
)}
​{/* ================= FOCUS TIMER TAB ================= */}
{currentTab === 'focus' && (
<div className="max-w-4xl mx-auto p-6 space-y-8 animate-fadeIn text-center">
<div className="max-w-md mx-auto bg-[#14192A] border border-[#94a3b8]/14 rounded-2xl p-8 shadow-2xl">
<h2 className="text-xl font-bold text-[#F5F7FF] mb-1">Precision Focus Timer</h2>
<p className="text-xs text-[#A1ABC0] mb-8">Maintain peak cognitive performance with timed deep work blocks.</p>
​<div className="text-6xl font-black font-mono text-[#67E8F9] tracking-wider mb-8">
{formatTimer(focusTime)}
</div>
​<div className="flex justify-center items-center space-x-4 mb-8">
<button
onClick={() => setIsFocusRunning(!isFocusRunning)}
className={px-8 py-3 rounded-xl font-medium text-xs flex items-center space-x-2 transition-all ${ isFocusRunning  ? 'bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/40'  : 'bg-[#7667F8] text-white hover:bg-[#6555E5] shadow-lg shadow-[#7667F8]/30' }}
>
{isFocusRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
<span>{isFocusRunning ? 'Pause Timer' : 'Start Focus'}</span>
</button>
<button
onClick={() => { setIsFocusRunning(false); setFocusTime(25 * 60); }}
className="p-3 rounded-xl bg-[#090B14] border border-[#94a3b8]/20 text-[#A1ABC0] hover:text-[#F5F7FF]"
>
<RotateCcw className="w-4 h-4" />
</button>
</div>
​<div className="grid grid-cols-3 gap-3">
{[15, 25, 45].map((mins) => (
<button
key={mins}
onClick={() => { setIsFocusRunning(false); setFocusTime(mins * 60); }}
className="bg-[#090B14] hover:bg-[#7667F8]/20 border border-[#94a3b8]/15 hover:border-[#7667F8] py-2.5 rounded-xl text-xs font-mono text-[#A1ABC0] hover:text-[#F5F7FF] transition-all"
>
{mins}m Focus
</button>
))}
</div>
</div>
</div>
)}
​{/* ================= REVISION CENTER TAB ================= */}
{currentTab === 'revision' && (
<div className="max-w-6xl mx-auto p-6 space-y-6 animate-fadeIn">
<div className="bg-[#14192A] border border-[#94a3b8]/14 p-6 rounded-2xl">
<h2 className="text-2xl font-bold text-[#F5F7FF]">Revision Center</h2>
<p className="text-xs text-[#A1ABC0] mt-1">Quick access to all your starred study days, bookmarked concepts, and personal notes.</p>
</div>
​<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{days.filter(d => d.starred).map((day) => (
<div key={day.id} className="bg-[#14192A] border border-[#7667F8]/30 rounded-xl p-5 flex flex-col justify-between">
<div>
<div className="flex justify-between items-center mb-2">
<span className="text-[10px] font-mono text-[#FBBF24] bg-[#FBBF24]/10 px-2 py-0.5 rounded">Starred Day {day.id}</span>
<Star className="w-4 h-4 text-[#FBBF24] fill-current" />
</div>
<h3 className="font-semibold text-sm text-[#F5F7FF] mb-2">{day.title}</h3>
<p className="text-xs text-[#A1ABC0] line-clamp-2">{day.summary}</p>
</div>
<button
onClick={() => { setSelectedDayId(day.id); setCurrentTab('workspace'); }}
className="mt-4 pt-3 border-t border-[#94a3b8]/10 text-xs text-[#7667F8] font-medium flex items-center justify-between"
>
<span>Review Lesson</span>
<ArrowRight className="w-3.5 h-3.5" />
</button>
</div>
))}
</div>
</div>
)}
​{/* ================= ANALYTICS TAB ================= */}
{currentTab === 'analytics' && (
<div className="max-w-7xl mx-auto p-6 space-y-6 animate-fadeIn">
<div className="bg-[#14192A] border border-[#94a3b8]/14 p-6 rounded-2xl">
<h2 className="text-2xl font-bold text-[#F5F7FF]">Empirical Learning Analytics</h2>
<p className="text-xs text-[#A1ABC0] mt-1">Detailed performance telemetry and study duration metrics.</p>
</div>
​<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
​{/* Weekly Study Chart */}
<div className="bg-[#14192A] border border-[#94a3b8]/14 p-6 rounded-2xl">
<h3 className="font-bold text-sm text-[#F5F7FF] mb-4">7-Day Rolling Study Duration (Hours)</h3>
<div className="h-64 w-full">
<ResponsiveContainer width="100%" height="100%">
<AreaChart data={WEEKLY_STUDY_DATA}>
<defs>
<linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
<stop offset="5%" stopColor="#7667F8" stopOpacity={0.4}/>
<stop offset="95%" stopColor="#7667F8" stopOpacity={0}/>
</linearGradient>
</defs>
<XAxis dataKey="day" stroke="#A1ABC0" fontSize={11} />
<YAxis stroke="#A1ABC0" fontSize={11} />
<Tooltip contentStyle={{ backgroundColor: '#14192A', borderColor: '#94a3b8/20', borderRadius: '8px', fontSize: '12px' }} />
<Area type="monotone" dataKey="hours" stroke="#7667F8" strokeWidth={2} fillOpacity={1} fill="url(#colorHours)" />
</AreaChart>
</ResponsiveContainer>
</div>
</div>
​{/* Subject Distribution */}
<div className="bg-[#14192A] border border-[#94a3b8]/14 p-6 rounded-2xl">
<h3 className="font-bold text-sm text-[#F5F7FF] mb-4">Curriculum Time Distribution</h3>
<div className="h-64 w-full flex items-center justify-center">
<ResponsiveContainer width="100%" height="100%">
<PieChart>
<Pie data={MODULE_DISTRIBUTION} dataKey="hours" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50} label>
{MODULE_DISTRIBUTION.map((entry, index) => (
<Cell key={cell-${index}} fill={entry.color} />
))}
</Pie>
<Tooltip contentStyle={{ backgroundColor: '#14192A', borderColor: '#94a3b8/20', borderRadius: '8px', fontSize: '12px' }} />
</PieChart>
</ResponsiveContainer>
</div>
</div>
​</div>
</div>
)}
​</main>
​{/* ================= AI COACH SLIDE-OVER DRAWER ================= */}
{aiChatOpen && (
<div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-[#14192A] border-l border-[#94a3b8]/20 shadow-2xl z-50 flex flex-col animate-slideInRight">
<div className="p-4 border-b border-[#94a3b8]/14 flex items-center justify-between bg-[#0D1120]">
<div className="flex items-center space-x-2">
<Sparkles className="w-4 h-4 text-[#67E8F9]" />
<h3 className="font-bold text-xs text-[#F5F7FF] uppercase tracking-wider">AI Technical Coach</h3>
</div>
<button onClick={() => setAiChatOpen(false)} className="text-[#A1ABC0] hover:text-[#F5F7FF]">
<X className="w-4 h-4" />
</button>
</div>
​<div className="flex-1 p-4 overflow-y-auto space-y-3">
{chatMessages.map((msg, idx) => (
<div key={idx} className={flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}}>
<div className={max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${ msg.sender === 'user'  ? 'bg-[#7667F8] text-white rounded-br-none'  : 'bg-[#090B14] border border-[#94a3b8]/15 text-[#F5F7FF] rounded-bl-none' }}>
{msg.text}
</div>
</div>
))}
</div>
​<div className="p-4 border-t border-[#94a3b8]/14 bg-[#0D1120]">
<div className="flex items-center space-x-2">
<input
type="text"
placeholder="Ask about closures, React 19, SQL..."
value={chatInput}
onChange={(e) => setChatInput(e.target.value)}
onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
className="flex-1 bg-[#090B14] border border-[#94a3b8]/20 rounded-xl px-3 py-2 text-xs text-[#F5F7FF] focus:outline-none focus:border-[#7667F8]"
/>
<button
onClick={handleSendMessage}
className="bg-[#7667F8] hover:bg-[#6555E5] p-2.5 rounded-xl text-white transition-all shadow-md shadow-[#7667F8]/30"
>
<Send className="w-3.5 h-3.5" />
</button>
</div>
</div>
</div>
)}
​</div>
);
}
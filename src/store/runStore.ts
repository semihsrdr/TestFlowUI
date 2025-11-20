import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Run {
    id: string;
    planId: string;
    planName: string;
    status: 'running' | 'passed' | 'failed';
    startTime: string;
    progress: number;
    logs: string[];
}

interface RunStore {
    runs: Run[];
    activeRunId: string | null;
    startRun: (planId: string, planName: string) => string;
    updateRun: (id: string, updates: Partial<Run>) => void;
    setActiveRun: (id: string | null) => void;
}

export const useRunStore = create<RunStore>()(
    persist(
        (set) => ({
            runs: [],
            activeRunId: null,
            startRun: (planId, planName) => {
                const id = `RUN-${Date.now()}`;
                const newRun: Run = {
                    id,
                    planId,
                    planName,
                    status: 'running',
                    startTime: new Date().toLocaleString(),
                    progress: 0,
                    logs: ['Initializing run environment...'],
                };
                set((state) => ({ runs: [newRun, ...state.runs], activeRunId: id }));
                return id;
            },
            updateRun: (id, updates) =>
                set((state) => ({
                    runs: state.runs.map((r) => (r.id === id ? { ...r, ...updates } : r)),
                })),
            setActiveRun: (id) => set({ activeRunId: id }),
        }),
        {
            name: 'run-storage',
        }
    )
);

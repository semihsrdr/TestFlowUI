import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TestPlan {
    id: string;
    name: string;
    environment: string;
    testIds: string[];
}

interface PlanStore {
    plans: TestPlan[];
    addPlan: (plan: TestPlan) => void;
    updatePlan: (id: string, updatedPlan: Partial<TestPlan>) => void;
    deletePlan: (id: string) => void;
}

export const usePlanStore = create<PlanStore>()(
    persist(
        (set) => ({
            plans: [
                {
                    id: '101',
                    name: 'Regression Suite',
                    environment: 'Staging',
                    testIds: ['1', '2'],
                },
            ],
            addPlan: (plan) => set((state) => ({
                plans: [...state.plans, { ...plan, testIds: Array.from(new Set(plan.testIds)) }]
            })),
            updatePlan: (id, updatedPlan) =>
                set((state) => ({
                    plans: state.plans.map((p) => (p.id === id ? {
                        ...p,
                        ...updatedPlan,
                        testIds: updatedPlan.testIds ? Array.from(new Set(updatedPlan.testIds)) : p.testIds
                    } : p)),
                })),
            deletePlan: (id) => set((state) => ({ plans: state.plans.filter((p) => p.id !== id) })),
        }),
        {
            name: 'plan-storage',
        }
    )
);

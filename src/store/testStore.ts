import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Test {
    id: string;
    name: string;
    tags: string[];
    code: string;
}

interface TestStore {
    tests: Test[];
    addTest: (test: Test) => void;
    updateTest: (id: string, updatedTest: Partial<Test>) => void;
    deleteTest: (id: string) => void;
}

export const useTestStore = create<TestStore>()(
    persist(
        (set) => ({
            tests: [
                {
                    id: '1',
                    name: 'Login Test',
                    tags: ['auth', 'smoke'],
                    code: 'Feature: Login\n  Scenario: Successful login\n    Given I am on the login page\n    When I enter valid credentials\n    Then I should be logged in',
                },
                {
                    id: '2',
                    name: 'Checkout Flow',
                    tags: ['e-commerce', 'critical'],
                    code: 'Feature: Checkout\n  Scenario: Guest checkout\n    Given I have items in cart\n    When I proceed to checkout\n    Then I should see payment options',
                },
            ],
            addTest: (test) => set((state) => ({ tests: [...state.tests, test] })),
            updateTest: (id, updatedTest) =>
                set((state) => ({
                    tests: state.tests.map((t) => (t.id === id ? { ...t, ...updatedTest } : t)),
                })),
            deleteTest: (id) => set((state) => ({ tests: state.tests.filter((t) => t.id !== id) })),
        }),
        {
            name: 'test-storage',
        }
    )
);

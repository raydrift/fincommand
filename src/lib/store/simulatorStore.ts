import { create } from 'zustand';

interface SimulatorState {
  simulationInProgress: boolean;
  scenarioName: string;
  setSimulationInProgress: (active: boolean) => void;
  setScenarioName: (name: string) => void;
}

export const useSimulatorStore = create<SimulatorState>((set) => ({
  simulationInProgress: false,
  scenarioName: 'Current Trajectory',
  setSimulationInProgress: (active) => set({ simulationInProgress: active }),
  setScenarioName: (name) => set({ scenarioName: name }),
}));

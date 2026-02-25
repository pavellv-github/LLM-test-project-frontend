import { create } from 'zustand';
import { fetchLaunchInfo } from '../../../shared/api/launchApi';

interface LaunchState {
  ready: boolean;
  loading: boolean;
  message: string;
  toggleReady: () => void;
  refreshMessage: () => Promise<void>;
}

export const useLaunchStore = create<LaunchState>((set) => ({
  ready: true,
  loading: false,
  message: 'Prototype is standing by.',
  toggleReady: () => set((state) => ({ ready: !state.ready })),
  refreshMessage: async () => {
    set({ loading: true });
    try {
      const data = await fetchLaunchInfo();
      set({ message: data.title });
    } catch (error) {
      set({ message: 'Unable to reach launch API. Try again shortly.' });
    } finally {
      set({ loading: false });
    }
  }
}));

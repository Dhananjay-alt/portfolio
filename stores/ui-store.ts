import { create } from "zustand";
import { persist } from "zustand/middleware";

type UIState = {
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  toggleCommand: () => void;

  soundEnabled: boolean;
  toggleSound: () => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      commandOpen: false,
      setCommandOpen: (open) => set({ commandOpen: open }),
      toggleCommand: () => set((s) => ({ commandOpen: !s.commandOpen })),

      soundEnabled: false,
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
    }),
    {
      name: "ui-prefs",
      // Only persist the sound preference; command state is ephemeral.
      partialize: (s) => ({ soundEnabled: s.soundEnabled }),
    },
  ),
);

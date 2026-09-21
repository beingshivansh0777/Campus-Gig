import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultPreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  consentGiven: false,
};

export const useCookieConsentStore = create(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      isPreferencesOpen: false,

      acceptAll: () =>
        set({
          preferences: { necessary: true, functional: true, analytics: true, consentGiven: true },
        }),

      rejectOptional: () =>
        set({
          preferences: { necessary: true, functional: false, analytics: false, consentGiven: true },
        }),

      savePreferences: (prefs) =>
        set({
          preferences: { ...prefs, necessary: true, consentGiven: true },
        }),

      openPreferences: () => set({ isPreferencesOpen: true }),
      closePreferences: () => set({ isPreferencesOpen: false }),
    }),
    {
      name: 'campus-gig-cookie-consent',
      partialize: (state) => ({ preferences: state.preferences }),
    }
  )
);
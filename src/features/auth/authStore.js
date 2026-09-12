import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isGig: false,

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setIsGig: (isGig) => set({ isGig }),

      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null, isGig: false }),
    }),
    {
      name: 'campus-gig-auth',
      partialize: (state) => ({ token: state.token, user: state.user, isGig: state.isGig }),
    }
  )
);
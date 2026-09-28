import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "light",

      setTheme: (theme) => {
        set({ theme });

        document.documentElement.setAttribute("data-theme", theme);
      },

      toggleTheme: () => {
        set((state) => {
          const nextTheme =
            state.theme === "light" ? "dark" : "light";

          document.documentElement.setAttribute(
            "data-theme",
            nextTheme
          );

          return {
            theme: nextTheme,
          };
        });
      },
    }),
    {
      name: "campus-gig-theme",
    }
  )
);
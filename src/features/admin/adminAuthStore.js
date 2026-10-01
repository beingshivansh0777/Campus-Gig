import { create } from "zustand";
import { persist } from "zustand/middleware";

const decodeJwtPayload = (token) => {
  try {
    const payload = token.split(".")[1];

    if (!payload) return null;

    const base64 = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const decoded = decodeURIComponent(
      atob(base64)
        .split("")
        .map(
          (char) =>
            `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`
        )
        .join("")
    );

    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

export const useAdminAuthStore = create(
  persist(
    (set) => ({
      token: null,
      email: null,

      setToken: (token) => {
        const payload = decodeJwtPayload(token);

        set({
          token,
          email: payload?.sub ?? null,
        });
      },

      logout: () =>
        set({
          token: null,
          email: null,
        }),
    }),
    {
      name: "campus-gig-admin-auth",
    }
  )
);

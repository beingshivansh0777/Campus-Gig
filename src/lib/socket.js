import { Client } from "@stomp/stompjs";

import { useAuthStore } from "../features/auth/authStore";

let stompClient = null;

export const getStompClient = () => {
  if (stompClient) return stompClient;

  const wsBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  const wsUrl = wsBaseUrl.replace(/^http/, "ws") + "/ws";

  stompClient = new Client({
    brokerURL: wsUrl,

    connectHeaders: {
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },

    reconnectDelay: 5000,
  });

  return stompClient;
};
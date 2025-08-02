import { io, Socket } from "socket.io-client";
import { create } from "zustand";
/* import { useAuthStore } from "./useAuthStore"; */
type Message = {
  id: string;
  text: string;
  sender: string;
};
type SocketState = {
  socket: Socket | null;
  isConnected: boolean;
  chatId: string | null;
  messageId: string | null;
  messages: Message[];
  connect: () => void;
  disconnect: () => void;
  sendMessage: (
    event: string,
    message: {
      prompt: string;
      chatId: string;
      messageId: string;
    }
  ) => void;
  setChatId: (chatId: string | null) => void;
  setMessageId: (messageId: string | null) => void;
  setMessages: (messages: Message) => void;
  resetChat: () => void;
};

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  messages: [],
  chatId: null,
  messageId: null,
  connect: () => {
    // Initialize socket connection
    const socket = io(process.env.EXPO_PUBLIC_URL_BASE, {
      transports: ["websocket"],
      autoConnect: false,
      extraHeaders: {
        /*  Authorization: `Bearer ${useAuthStore.getState().token}`, */
      },
    });

    socket.on("connect", () => {
      set({ isConnected: true });
    });

    socket.on("disconnect", () => {
      set({ isConnected: false });
    });

    socket.connect();
    set({ socket });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },

  sendMessage: (
    event: string,
    message: {
      prompt: string;
      chatId: string;
      messageId: string;
    }
  ) => {
    const { socket, isConnected } = get();
    if (socket && isConnected) {
      socket.emit(event, message);
    }
  },
  setChatId: (chatId: string | null) => set({ chatId }),
  setMessageId: (messageId: string | null) => set({ messageId }),
  setMessages: (messages: Message) =>
    set((state) => ({ messages: [...state.messages, messages] })),
  resetChat: () => set({ chatId: null, messageId: null, messages: [] }),
}));

export {};

declare global {
  interface Window {
    api: {
      tiktokConnect: (username: string) => Promise<any>;
      tiktokDisconnect: () => Promise<any>;
    };
  }
}

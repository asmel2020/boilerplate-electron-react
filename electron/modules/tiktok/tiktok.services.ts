/* import { TikTokLiveConnection, WebcastEvent } from "tiktok-live-connector"; */

// Recibir usuario desde el frontend

import { TikTokLiveConnection, WebcastEvent } from "tiktok-live-connector";

let tiktokClient: TikTokLiveConnection | null = null;
export const tiktokConnect = async (tiktokUsername: string) => {
  // Verificar si ya existe un cliente
  if (tiktokClient && tiktokClient.isConnected) {
    return { success: false, message: "Ya existe un cliente activo" };
  }

  tiktokClient = new TikTokLiveConnection(tiktokUsername, {
    enableExtendedGiftInfo: true,
  });

  // chats
  tiktokClient.on(WebcastEvent.CHAT, (data: any) => {
    console.log(data);
  });
  // regalos
  tiktokClient.on(WebcastEvent.GIFT, (data: any) => {
    console.log(data);
  });

  // like
  tiktokClient.on(WebcastEvent.LIKE, (data: any) => {
    console.log(data);
  });
  // share
  tiktokClient.on(WebcastEvent.SHARE, (data: any) => {
    console.log(data);
  });

  // rooo_user
  tiktokClient.on(WebcastEvent.ROOM_USER, (data: any) => {
    console.log(data);
  });
  /// subscribe
  tiktokClient.on(WebcastEvent.SUBSCRIBE, (data: any) => {
    console.log(data);
  });

  tiktokClient.on(WebcastEvent.FOLLOW, () => {
    console.log("Stream ended");
  });

  tiktokClient.on(WebcastEvent.STREAM_END, () => {
    console.log("Stream ended");
  });

  // Connect to the chat (await can be used as well)
  tiktokClient
    .connect()
    .then((state: any) => {
      console.info(`Connected to roomId ${state.roomId}`);
    })
    .catch((err: any) => {
      console.error("Failed to connect", err);
    });
};

export const tiktokDisconnect = async () => {
  try {
    if (!tiktokClient)
      return { success: false, message: "No hay cliente activo" };

    await tiktokClient.disconnect();
    return { success: true, message: "Disconnected" };
  } catch (error) {}
};

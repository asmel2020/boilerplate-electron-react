// wsService.ts
import { io } from "./server";

export class WsService {
  static broadcast(event: string, data: unknown) {
    io.emit(event, data);
  }

  static sendToClient(socketId: string, event: string, data: unknown) {
    io.to(socketId).emit(event, data);
  }
}

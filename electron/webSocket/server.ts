// socket.ts
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();

export const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// Manejo de conexiones
io.on("connection", (socket: Socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  socket.on("mensaje", (data: string) => {
    console.log("Cliente dice:", data);
    // Reenviar a todos
    io.emit("mensaje", `Eco: ${data}`);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Arranca el servidor
httpServer.listen(3000, () => {
  console.log("Servidor WebSocket escuchando en http://localhost:3000");
});

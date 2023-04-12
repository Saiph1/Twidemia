import { Server } from "socket.io";
// import messageHandler from "../../utils/sockets/messageHandler";

export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }
  console.log("Initializing Socket.");
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  // const onConnection = (socket) => {
  //   messageHandler(io, socket);
  // };

  // // Define actions inside
  io.on("connection", (socket) => {
    socket.on("input-change", (msg) => {
      socket.broadcast.emit("update-input", msg);
    });
  });
  // io.on("connection", onConnection);
  res.end();
}

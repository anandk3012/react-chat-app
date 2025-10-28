// in client/socket-client.js
import { io } from "socket.io-client";
import { HOST, SOCKET_CONNECTION_OPTIONS } from "./utils/constants";

let socket;

export const initializeSocket = (userId) => {
  // If a socket already exists, disconnect it before creating a new one
  if (socket) {
    socket.disconnect();
  }

  // Connect to the server and send the userId in the query
  socket = io(HOST, {
    ...SOCKET_CONNECTION_OPTIONS,
    query: { userId }, // This is crucial for the server
  });

  socket.on("connect", () => {
    console.log("Socket connected successfully:", socket.id);
  });

  return socket;
};

// Export the socket instance for other files to import
export { socket };
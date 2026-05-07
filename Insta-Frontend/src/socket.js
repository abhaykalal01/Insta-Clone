import { io } from "socket.io-client";

export const socket = io("https://insta-backend.onrender.com/api", {
    transports: ["websocket"],
    autoConnect: false,
});
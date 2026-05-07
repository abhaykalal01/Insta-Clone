import { io } from "socket.io-client";

export const socket = io("https://insta-clone-apnn.onrender.com", {
    transports: ["websocket"],
    autoConnect: false,
});
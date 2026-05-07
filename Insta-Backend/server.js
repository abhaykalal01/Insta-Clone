import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
dotenv.config();
connectDB();

const app = express();

//  IMPORTANT: express ko http server me wrap karo
const server = http.createServer(app);

//  SOCKET SETUP
app.use(cors({
    origin: "https://insta-clone-liart-one.vercel.app",
    credentials: true
}));

const io = new Server(server, {
    cors: {
        origin: "https://insta-clone-liart-one.vercel.app",
        methods: ["GET", "POST"],
    },
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running ");
});

app.get("/api/test", authMiddleware, (req, res) => {
    res.json({
        message: "Protected route accessed ",
        user: req.user,
    });
});

//  ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);


//  SOCKET LOGIC (ADD HERE)
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // user join (room)
    socket.on("join", (userId) => {
        socket.join(userId);
        console.log("User joined room:", userId);
    });

    // send message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        console.log("Message:", senderId, "→", receiverId, text);

        io.to(receiverId).emit("receiveMessage", {
            senderId,
            text,
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


//  IMPORTANT: app.listen  → server.listen
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
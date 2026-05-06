import { useEffect, useState, useRef } from "react";
import { socket } from "../socket";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    createConversationApi,
    getMessagesApi,
    sendMessageApi,
} from "../api/messageApi";

function Chat() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [conversationId, setConversationId] = useState("");

    const messagesEndRef = useRef(null);

    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const currentUserId =
        loggedUser?.user?._id || loggedUser?.user?.id;

    const receiverId =
        currentUserId === "69f0ad1c5f689b2efb394472"
            ? "69f44aa8a8384421de73947c"
            : "69f0ad1c5f689b2efb394472";


    useEffect(() => {

        const setupConversation = async () => {

            try {

                const conversation =
                    await createConversationApi(receiverId);

                setConversationId(conversation._id);

                const oldMessages =
                    await getMessagesApi(conversation._id);

                setMessages(oldMessages);

            } catch (error) {
                console.log(error);
            }
        };

        setupConversation();

    }, [receiverId]);


    useEffect(() => {

        if (!socket.connected) {
            socket.connect();
        }

        if (currentUserId) {
            socket.emit("join", currentUserId);
        }

    }, [currentUserId]);


    useEffect(() => {

        const receiveHandler = (data) => {

            setMessages((prev) => [...prev, data]);
        };

        socket.on("receiveMessage", receiveHandler);

        return () => {
            socket.off("receiveMessage", receiveHandler);
        };

    }, []);


    // AUTO SCROLL
    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);


    const handleSend = async () => {

        if (!message.trim()) return;

        try {

            const newMsg = {
                conversationId,
                receiverId,
                text: message,
            };

            const savedMessage =
                await sendMessageApi(newMsg);

            socket.emit("sendMessage", {
                senderId: currentUserId,
                receiverId,
                text: savedMessage.text,
            });

            setMessages((prev) => [
                ...prev,
                {
                    senderId: currentUserId,
                    text: savedMessage.text,
                },
            ]);

            setMessage("");

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="bg-[#fafafa] min-h-screen pt-20">

            <div className="max-w-md mx-auto bg-white border rounded-lg shadow-sm">

                {/* Header */}
                <div className="border-b p-4 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => navigate("/")}
                            className="hover:bg-gray-100 p-2 rounded-full transition"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        <img
                            src="https://i.pravatar.cc/150?img=12"
                            alt="user"
                            className="w-10 h-10 rounded-full"
                        />

                        <div>
                            <h2 className="font-semibold text-lg">
                                {currentUserId === "69f0ad1c5f689b2efb394472"
                                    ? "Diya"
                                    : "Abhay"}
                            </h2>

                            <p className="text-xs text-green-500">
                                Online
                            </p>
                        </div>

                    </div>

                </div>

                {/* Messages */}
                <div className="h-[500px] overflow-y-auto p-4 flex flex-col">

                    {messages.map((m, i) => {

                        const senderId = String(
                            m.senderId || m.sender?._id
                        );

                        const loggedInUserId =
                            String(currentUserId);

                        const isOwnMessage =
                            senderId === loggedInUserId;

                        return (

                            <div
                                key={i}
                                className={`flex mb-3 ${isOwnMessage
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}
                            >

                                <div
                                    className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm break-words ${isOwnMessage
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-black"
                                        }`}
                                >
                                    {m.text}
                                </div>

                            </div>
                        );
                    })}

                    <div ref={messagesEndRef}></div>

                </div>

                {/* Input */}
                <div className="border-t p-3 flex gap-2">

                    <input
                        type="text"
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                        placeholder="Type a message..."
                        className="flex-1 border rounded-full px-4 py-2 outline-none"
                    />

                    <button
                        onClick={handleSend}
                        className="bg-blue-500 text-white px-5 rounded-full hover:bg-blue-600 transition"
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Chat;
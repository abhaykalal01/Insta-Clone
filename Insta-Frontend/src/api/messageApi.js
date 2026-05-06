import API from "./axios";

export const createConversationApi = async (receiverId) => {
    const res = await API.post("/chat/conversation", {
        receiverId,
    });

    return res.data;
};

export const getMessagesApi = async (conversationId) => {
    const res = await API.get(`/chat/message/${conversationId}`);

    return res.data;
};

export const sendMessageApi = async (data) => {
    const res = await API.post("/chat/message", data);

    return res.data;
};
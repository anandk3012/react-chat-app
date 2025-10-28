import { Message } from "../models/MessagesModel.js";
import { io, userSocketMap } from "../socket.js"; // Make sure your socket exports io instance
import fs from "fs";

// Add a new message
export const addMessage = async (req, res) => {
    try {
        const { recipientId, messageType, content, chatId } = req.body;
        const senderId = req.userId;

        let fileUrl = null;
        if (req.file) {
            fileUrl = "uploads/messages/" + Date.now() + req.file.originalname;
            fs.renameSync(req.file.path, fileUrl);
        }

        const message = await Message.create({
            chatId: chatId,
            sender: senderId,
            recipient: recipientId,
            messageType,
            content: messageType === "text" ? content : null,
            fileUrl: messageType === "file" ? fileUrl : null,
        });

        const populatedMessage = await Message.findById(message._id).populate(
            "sender",
            "_id email firstName lastName"
        );
        // Emit real-time update via Socket.io
        const recipientSocketId = userSocketMap.get(recipientId);
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("receive-message", populatedMessage);
        }
        const senderSocketId = userSocketMap.get(senderId);
        if (senderSocketId) {
            io.to(senderSocketId).emit("receive-message", populatedMessage);
        }

        return res.status(201).json({ message : populatedMessage });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to send message");
    }
};

// Get messages between current user and recipient
export const getMessages = async (req, res) => {
    try {
        const chatId = req.params.chatId;

        const messages = await Message.find({ chatId })
            .populate("sender", "id email firstName lastName")
            .populate("recipient", "id email firstName lastName")
            .sort({ timeStamp: 1 }); // Sort chronologically
        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to fetch messages");
    }
};

// Mark a message as read
export const readMessage = async (req, res) => {
    try {
        const messageId = req.params.messageId;

        const message = await Message.findByIdAndUpdate(
            messageId,
            { read: true },
            { new: true }
        );

        if (!message) return res.status(404).send("Message not found");

        // Optional: emit read receipt
        io.to(message.sender.toString()).emit("message-seen", message);

        res.status(200).json(message);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to mark message as read");
    }
};

// Delete a message
export const deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const message = await Message.findByIdAndDelete(messageId);

        if (!message) return res.status(404).send("Message not found");

        // Optional: delete file from disk
        if (message.fileUrl && fs.existsSync(message.fileUrl)) {
            fs.unlinkSync(message.fileUrl);
        }

        res.status(200).send("Message deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to delete message");
    }
};

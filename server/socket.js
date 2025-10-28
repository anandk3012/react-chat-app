import { Server as SocketIoServer } from 'socket.io'
import { Message } from './models/MessagesModel.js';
export let io;
export const userSocketMap = new Map();
const setupSocket = (server) => {
    io = new SocketIoServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ['GET', 'POST'],
            credentials: true
        }
    })


    const disconnect = (socket) => {
        console.log(`Client Disconnected ${socket.id}`)
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId)
                break;
            }
        }

    }
    const sendMessage = async (message) => {
        console.log("Message received on server via socket:", message);
        const senderSocketId = userSocketMap.get(message.sender.id);
        const recipientSocketId = userSocketMap.get(message.recipient.id);

        const createMessage = await Message.create({
            chatId: message.chatId,
            sender: message.sender.id,         // ObjectId only
            recipient: message.recipient.id,   // ObjectId only
            content: message.content,
            messageType: message.messageType,
            timeStamp: message.timeStamp
        });

        const messageData = await Message.findById(createMessage._id)
            .populate("sender", "id email firstName lastName image color")
            .populate("recipient", "id email firstName lastName image color");

        if (recipientSocketId) {
            io.to(recipientSocketId).emit("receive-message", messageData);
        }
        if (senderSocketId) {
            io.to(senderSocketId).emit("receive-message", messageData);
        }
    }

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User ${userId} connected with socket : ${socket.id} `)
        } else {
            console.log('User connected without userId')
        }

        // socket.on('send-message', sendMessage);
        socket.on('disconnect', () => {
            disconnect(socket);
        })

    })

}

export default setupSocket;
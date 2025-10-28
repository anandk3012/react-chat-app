import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";
import { addMessage, getMessages, readMessage, deleteMessage } from "../controllers/MessageController.js";

// multer setup for file uploads (images/files)
const upload = multer({ dest: "uploads/messages/" });

const messageRouter = Router();

// All routes are protected with JWT
messageRouter.use(verifyToken);
// Send a new message (text or file)
messageRouter.post("/send", upload.single("file"), addMessage);
// Get all messages between users (with pagination optional)
messageRouter.get("/get-messages/:chatId", getMessages);
// Mark a message as read
messageRouter.put("/read/:messageId", readMessage);
// Delete a message
messageRouter.delete("/delete/:messageId", deleteMessage);

export default messageRouter;

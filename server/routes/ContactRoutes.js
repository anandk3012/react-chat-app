import { Router } from "express";
import { addProfileImage, getUserInfo, login, logout, removeProfileImage, signUp, updateProfile } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";
import { searchContacts } from "../controllers/ContactsController.js";

const contactRoutes = Router();

contactRoutes.post('/search', verifyToken,searchContacts);

export default contactRoutes;
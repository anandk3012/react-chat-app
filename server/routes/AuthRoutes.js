import { Router } from "express";
import { addProfileImage, getUserInfo, login, logout, removeProfileImage, signUp, updateProfile } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest : "uploads/profiles/" })

authRoutes.post("/signup", signUp);
authRoutes.post('/login',login);
authRoutes.get('/userinfo',verifyToken, getUserInfo);
authRoutes.post('/update-profile',verifyToken, updateProfile)
authRoutes.post('/add-profile-image',verifyToken, upload.single("profile-image") ,addProfileImage )
authRoutes.delete('/remove-profile-image',verifyToken,removeProfileImage)
authRoutes.post('/logOut',logout);
export default authRoutes;
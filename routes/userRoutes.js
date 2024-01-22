import { Router } from "express";
import {userLogin, userDetails, uploadImage, upload, } from "../controller/userController.js";
const userRoutes = Router();

userRoutes.post("/user/login", userLogin);
userRoutes.get("/user/details/:userId", userDetails);
userRoutes.post("/upload", upload.single('uploaded_file'), uploadImage)

export default userRoutes;
import { Router } from "express";
import { home, adminLogin, getCreateUser, postCreateUser, viewUser, verifyUser, deleteUser } from "../controller/adminController.js"
const adminRoutes = Router();

adminRoutes.get("/", home);
adminRoutes.post("/admin/login", adminLogin);
adminRoutes.get("/admin/createUser", getCreateUser);
adminRoutes.post("/admin/createUser", postCreateUser);
adminRoutes.get("/admin/viewUser", viewUser);
adminRoutes.post("/admin/verifyUser", verifyUser);
adminRoutes.post("/admin/deleteUser", deleteUser);

export default adminRoutes;
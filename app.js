import express from "express";
import dbConnect from "./dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { initializeAdmin } from "./adminConfig.js";

const app = express();

app.set("view engine", "ejs");

const port = process.env.PORT || 5000

dbConnect()
    .then(() => console.log("Database Connected Successfully"))
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });

initializeAdmin(); // To create Admin Credentials

app.use(express.static("public"));
app.use(express.json());

app.use(userRoutes);
app.use(adminRoutes);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
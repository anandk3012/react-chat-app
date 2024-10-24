import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from "cors"
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";

// configure dotenv
dotenv.config();

// create express app and define variables
const app = express();
const port = process.env.PORT || 8747;
const databaseURL = process.env.DATABASE_URL;

// Enable cors to allow cross origin communication between client and server
app.use(
    cors({
        origin: [process.env.ORIGIN, "http://localhost:5173/"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true // to enable cookies we need to enable credentials as true
    })
)

app.use("uploads/profiles/", express.static("uploads/profiles/"));
app.use(cookieParser());
app.use(express.json());

// Define server Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts',contactRoutes);


// define server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

setupSocket(server);

// Connect to mongoDB
mongoose
    .connect(databaseURL)
    .then(() => {
        console.log("db connection successful");
    })
    .catch((err) => {
        console.log(err.message)
    })


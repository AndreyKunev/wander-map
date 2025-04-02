import mongoose from "mongoose";
import { app, connectDB } from "../src";

const port = process.env.PORT;
const host = process.env.HOST;

const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(
            `server running : http://${port}:${host}`
        );
    });
}

startServer();
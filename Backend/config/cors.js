import cors from "cors";
import env from "dotenv";
env.config();

const configCors = cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
});

export default configCors;
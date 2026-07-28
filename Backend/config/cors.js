import cors from "cors";

const configCors = cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
});

export default configCors;
import session from "express-session";
import env from "dotenv";
import connectPgSimple from "connect-pg-simple";
import pool from "./db.js";

env.config();

const pgStore = connectPgSimple(session);

const createSession = session({
    store: new pgStore({
        pool,
        createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        path: "/",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    }
});

export default createSession;
import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import configCors from "./config/cors.js";
import passport from "passport";
import configPassport from "./config/passport.js";
import createSession from "./config/session.js";
import authRouter from "./routes/authRouter.js";

//config
const app = express();
const port = 3000;
env.config();
configPassport();

//middleware

app.use(configCors);
app.use(createSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Auth routes
app.use("/user", authRouter);




//Start Server
app.listen(port, () => {
    console.log(`Server started on port localhost:${port}`);
})




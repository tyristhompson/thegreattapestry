import { Router } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import bookModel from "../models/bookModel.js";
import env from "dotenv";
env.config();

const authRouter = Router();



authRouter.post("/login", passport.authenticate("local"),
    (req, res) => {
        return res.status(200).json({ user: req.user });
    });

authRouter.post("/register", async (req, res) => {
    if (!req.body?.username || !req.body?.email || !req.body?.password) {
        return res.status(400).json({ error: "Bad Request" });
    }
    try {
        const email = await userModel.findEmail(req.body.email);

        if (email.length > 0) {
            return res.status(200).json({ error: "This email is already in use. Please try logging in." });
        } else {
            bcrypt.hash(req.body.password, Number(process.env.SALT), async (err, hash) => {
                if (err) {
                    return res.status(500).json({ error: err, message: "Error hashing password" });
                }
                try {
                    const user = await userModel.createUser(req.body.username, req.body.email, hash);

                    req.login(user, (err) => {
                        if (err) {
                            return res.status(500).json({ error: err, message: "Can not log in user at this time." });
                        } else {
                            return res.status(200).json({ user: user });
                        }
                    })
                } catch (err) {
                    return res.status(200).json({ error: err, message: "This username is taken." });
                }
            });
        };

    } catch (err) {
        return res.status(500).json({ error: err, message: "Error adding user" });
    }
});

authRouter.get("/me", async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Please log in." });
    } else {
        return res.status(200).json({ user: req.user });
    }
})

authRouter.get("/profile", async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Please log in." });
    }

    if (req.query.sort) {
        try {
            const sortedLibrary = await bookModel.getSorted(req.query.sort)
            return res.status(200).json({ library: sortedLibrary });
        } catch (err) {
            return res.status(500).json({ error: err, message: "Couldn't retrieve library" });
        }
    }
    else {
        try {
            const Library = await bookModel.getUserBooks();
            return res.status(200).json({ library: Library });
        } catch (err) {
            return res.status(500).json({ error: err, message: "Couldn't retrieve library" });

        }
    }
});

authRouter.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({error: err});
            }
            res.clearCookie("connect.sid");
            return res.status(200).json({ message: "Logout successful." });
        })
    });
});

export default authRouter;
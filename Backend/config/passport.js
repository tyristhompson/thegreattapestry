import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

const {findByUsername, findById} = userModel;

export default function configPassport() {
    passport.use(new Strategy(async function verify(username, password, done) {
        try {
            const result = await findByUsername(username);

            if (result.length > 0) {
                const user = result[0];

                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return done(err)
                    } else {
                        if (result) {
                            return done(null, {username: user.username, id: user.id, email: user.email});
                        } else {
                            return done(null, false)
                        }
                    };
                })
            };
        } catch(err) {
            return done(err);
        };
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (userId, done) => {
        const result = await findById(userId);
        if (result.length > 0) {
            done(null, result[0]);
        } else {
            done(null, false);
        }
    });
};
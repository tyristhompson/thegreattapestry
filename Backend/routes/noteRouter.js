import { Router } from "express";
import noteModel from "../models/noteModel.js";

const noteRouter = Router();

noteRouter.get("/:key", async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "please log in" })
    }
    const response = await noteModel.getNote(req.params.key, req.user.id);
    return res.status(200).json(response);
});

noteRouter.post("/create/:key", async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "please log in" })
    }
    if (!req.body?.note) {
        return res.status(400).json("Bad Request");
    }

    try {
        const response = await noteModel.createNote(req.params.key, req.user.id, req.body.note);
        return res.status(200).json({ added: response });
    } catch (error) {
        return res.status(400).json(error)
    }
});

noteRouter.patch("/update/:key", async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "please log in" })
    }
    if (!req.body?.note) {
        return res.status(400).json("Bad Request");
    }

    try {
        const response = await noteModel.updateNote(req.params.key, req.user.id, req.body.note);
        return res.status(200).json({ updated: response });
    } catch (error) {
        return res.status(400).json(error)
    }
});

export default noteRouter;
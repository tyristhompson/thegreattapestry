import { Router } from "express";
import bookModel from "../models/bookModel.js";
import noteModel from "../models/noteModel.js";

const bookRouter = Router();


bookRouter.get("/library", async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "please log in" })
    }
    const response = await bookModel.getUserBooks(req.user.id);
    return res.status(200).json({ library: response });
});

bookRouter.post("/search", async (req, res) => {
    if (!req.body?.search) {
        return res.status(400).json("Bad Request");
    } else {
        const result = await bookModel.fetchTitle(req.body.search);
        if (!result) {
            return res.status(500).json({ message: "Could not fetch searched title at this time." });
        } else {
            return res.status(200).json({ books: result });
        }
    }
});

//Need to finish updating these routes.
bookRouter.get(`/info/:key`, async (req, res) => {
    try {
        const bookResponse = await bookModel.getBookInfo(req.params.key);
        const info = {
            title: bookResponse.title,
            description: bookResponse.description,
            cover: bookResponse.covers[0],
            key: bookResponse.key
        };

        return res.status(200).json({ book: info });
    }
    catch (error) {
        return res.status(500).json({ error });
    };

});

bookRouter.post('/add', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "please log in" })
    }

    const title = req.body?.title?.trim();
    const key = req.body?.key?.trim();
    const description = req.body?.description?.trim();
    const cover = req.body?.cover;
    try {
        const response = await bookModel.addToLibrary(title, key, req.user.id, cover, description);
        return res.status(200).json({ added: response });
    } catch (error) {
        return res.status(400).json(error)
    }


});

bookRouter.delete('/delete/:key', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "please log in" })
    }
    if (req.params.key) {
        try {
            const noteResponse = await noteModel.deleteNote(req.params.key, req.user.id);
            const bookResponse = await bookModel.deleteFromLibrary(req.params.key, req.user.id);
            return res.status(200).json({ deleteStatus: {bookResponse, noteResponse} });

        } catch (err) {
            return res.status(400).json({ error: err });
        }
    } else {
        return res.status(400).send("improper key");
    }
});

export default bookRouter;
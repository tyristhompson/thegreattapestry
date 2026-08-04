import { Router } from "express";
import bookModel from "../models/bookModel.js";

const bookRouter = Router();


bookRouter.get("/library", async (req, res) => {
    if(!req.isAuthenticated()) {
        return res.status(401).json({error: "please log in"})
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
    console.log(req.params.key);
    try {
        const bookResponse = await bookModel.getBookInfo();

        return res.status(200).json({ book: bookResponse });
    }
    catch (error) {
        return res.status(500).json({ error });
    };

});

bookRouter.post('/add', async (req, res) => {
    if(!req.isAuthenticated()) {
        return res.status(401).json({error: "please log in"})
    }

    const title = req.body?.title?.trim();
    const key = req.body?.key?.trim();
    const description = req.body?.description?.trim();
    const cover = req.body?.cover?.trim();
    try {
        const response = await bookModel.addToLibrary(title, key, req.user.id, cover, description);
        return res.status(200).json({ added: response });
    } catch (error) {
        return res.status(400).json(error)
    }


})

export default bookRouter;
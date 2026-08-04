import { Router } from "express";
import bookModel from "../models/bookModel.js";

const bookRouter = Router();


bookRouter.get("/library", async (req, res) => {
        const response = await bookModel.getUserBooks();
        res.status(200).json({library: response});
});

bookRouter.post("/search", async (req, res) => {
    if (!req.body?.search) {
        res.status(400).json("Bad Request");
    } else {
        const result = await bookModel.fetchTitle(req.body.search);
        if(!result) {
            res.status(500).json({message: "Could not fetch searched title at this time."});
        } else {
            res.status(200).json({books: result});
        }   
    }
});

//Need to finish updating these routes.
bookRouter.get(`/info/:key`, async (req, res) => {
    console.log(req.params.key);
    try {
        const bookResponse = await bookModel.getBookInfo();

        res.status(200).json({ book: bookResponse });
    }
    catch (error) {
        res.status(500).json({ error });
    };

});

bookRouter.post('/add', async (req, res) => {
    const title = req.body?.title?.trim();
    const description = req.body?.description?.trim();
    const cover = req.body?.cover?.trim();
    try {
        await bookModel.addToLibrary(title, description, cover);
    } catch (error) {
        res.status(400).json(error)
    }


})

export default bookRouter;
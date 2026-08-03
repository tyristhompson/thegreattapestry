import { Router } from "express";
import axios from "axios";
import bookModel from "../models/bookModel";

const bookRouter = Router();


bookRouter.post("/books", async (req, res) => {
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
        const bookResponse = await axios.get(`https://openlibrary.org/works/${req.params.key}.json`);
        const bookResult = bookResponse.data;

        res.status(200).json({ book: bookResult });
    }
    catch (error) {
        res.status(500).json({ error });
    };

});

bookRouter.get('/notes/:id', async (req, res) => {
    const response = await db.query("SELECT title FROM library WHERE id = $1", [+req.params.id]);
    res.json(`Write a review about ${response.rows[0].title}`);
});

bookRouter.post('/add', async (req, res) => {
    if (req.body.back) {
        res.redirect('/search');
    }

    const bookInfo = {
        title: req.body.title.trim(),
        description: req.body.description.trim(),
        cover: req.body.cover.trim()
    };
    try {
        await db.query("INSERT INTO library (title, description, cover)  VALUES ($1, $2, $3)",
            [bookInfo.title, bookInfo.description, bookInfo.cover]
        );

        res.status(200).redirect('/profile');

    } catch (error) {
        res.json(error)
    }


})

export default bookRouter;
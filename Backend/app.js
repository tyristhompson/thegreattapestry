import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import PG from "pg";
import env from "dotenv";
import bcrypt, { hash } from "bcrypt";


const app = express();
const port = 3000;
env.config();

const salt = process.env.SALT;

const db = new PG.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect();

//middleware
app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes
app.post("/login", async (req, res) => {
    if (!req.body?.username || !req.body?.password) {
        console.log(req.headers);
        console.log(req.body);
        res.status(400).send({ error: "Bad Request" });
    } else {
        const loginInfo = {
            username: req.body.username.trim(),
            password: req.body.password.trim()
        };

        try {
            const result = await db.query("SELECT * FROM users WHERE username = $1", [loginInfo.username]);

            if (result.rows.length > 0) {
                const user = result.rows[0];
                const hashedPassword = user.password;

                bcrypt.compare(loginInfo.password, hashedPassword, async (error, result) => {
                    if (error) {
                        res.status(401).send({ error: "Incorrect Password" });
                        console.log("Error comparing passwords", error);
                    } else {
                        if (result) {
                            res.status(200).send({ user: {username: user.username, id: user.id, email: user.email} });
                        } else {
                            res.status(401).send({ error: "Incorrect Password" });
                        }
                    }
                })
            } else {
                res.status(401).send({ error: "User not found" });
            }
        } catch (error) {
            console.log(error);
        }
    };

});

app.post("/register", async (req, res) => {
    if (!req.body?.userName || !req.body?.email || !req.body?.password) {
        res.status(400).send("Bad Request");
    }
    const userInfo = {
        userName: req.body.userName.trim(),
        email: req.body.email.trim(),
        password: req.body.password.trim()
    };

    try {
        const checkUserEmail = await db.query("SELECT email FROM users WHERE email = $1", [userInfo.email]);

        if (checkUserEmail.rows.length > 0) {
            res.send("This email is already in use. Please try logging in.");
        } else {
            bcrypt.hash(userInfo.password, salt, async (error, hash) => {
                if (error) {
                    console.log("Error hashing password", error);
                }
                try {
                    await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
                        [userInfo.userName, userInfo.email, hash]
                    );
                    res.redirect("/login");
                } catch (error) {
                    res.status(400).send("This username is taken.", error);
                }
            });
        };

    } catch (error) {
        res.status(500).send("Error adding user", error);
    }
})

app.get("/profile", async (req, res) => {
    const user = sessionStorage.getItem("userName");

    if (req.query.sort) {
        try {
            const allowedColumns = ['title', 'rating', 'date_read'];
            const sort = req.query.sort;

            const validatedColumn = allowedColumns.includes(sort) ? sort : 'id';

            const response = await db.query(`SELECT * FROM library ORDER BY ${validatedColumn};`);
            res.render("profile.ejs", { userName: user, library: response.rows });
        } catch (error) {
            res.send(error);
        }
    }
    else {
        try {
            const response = await db.query("SELECT * FROM library");
            res.render("profile.ejs", { userName: user, library: response.rows });
        } catch (error) {
            res.send(error);
        }
    }
});

//Search catalog
app.post("/books", async (req, res) => {
    if (!req.body?.search) {
        res.status(400).send("Bad Request");
    } else {
        const title = req.body.search;
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const response = await axios.get(
                    "https://openlibrary.org/search.json",
                    {
                        params: {
                            title: title,
                            sort: "rating",
                            page: 1
                        },
                        timeout: 50000
                    }
                );

                return res.status(200).send({ books: response.data.docs });
            } catch (error) {
                const retryable = ["ETIMEDOUT", "ECONNRESET"].includes(error.code);

                if (!retryable || attempt === 3) {
                    res.status(500).send("Could not retrieve books for this search", error)
                }

                await new Promise(resolve =>
                    setTimeout(resolve, attempt * 500)
                );
            }
        }
    }
});

//Book info page
app.get(`/info/:key`, async (req, res) => {
    console.log(req.params.key);
    try {
        const bookResponse = await axios.get(`https://openlibrary.org/works/${req.params.key}.json`,
            {
                headers: {
                    "User-Agent": "TheGreatTapestry (tyrscott459@gmail.com)"
                }
            }
        );
        const bookResult = bookResponse.data;

        //console.log(bookResult);
        res.status(200).send({ book: bookResult });
    }
    catch (error) {
        res.status(500).send({ error });
    };

});

app.get('/notes/:id', async (req, res) => {
    const response = await db.query("SELECT title FROM library WHERE id = $1", [+req.params.id]);
    res.send(`Write a review about ${response.rows[0].title}`);
});

app.post('/add', async (req, res) => {
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
        res.send(error)
    }


})

//Start Server
app.listen(port, () => {
    console.log(`Server started on port localhost:${port}`);
})





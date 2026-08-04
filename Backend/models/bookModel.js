import pool from "../config/db.js";
import axios from "axios";

export default {
    getSorted: async (sort) => {
        const allowedColumns = ['title', 'rating', 'date_read'];
        const validatedColumn = allowedColumns.includes(sort) ? sort : 'id';
        const result = await pool.query("SELECT * FROM library ORDER BY $1;", [validatedColumn]);
        return result.rows;
    },
    getUserBooks: async () => {
        const result = await pool.query("SELECT * FROM library");
        return result.rows;
    },
    fetchTitle: async (title) => {
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const response = await axios.get(
                    "https://openlibrary.org/search.json",
                    {
                        params: {
                            title,
                            sort: "rating",
                            page: 1
                        },
                        timeout: 50000
                    }
                );

                return response.data.docs;
            } catch (err) {
                const retryable = ["ETIMEDOUT", "ECONNRESET"].includes(err.code);

                if (!retryable || attempt === 3) {
                    return undefined;
                }

                await new Promise(resolve =>
                    setTimeout(resolve, attempt * 500)
                );
            }
        }
    },
    getBookInfo: async (key) => {
        try {
            const result = await axios.get(`https://openlibrary.org/works/${key}.json`);
            return result.data;
        } catch (err) {
            console.log(err);
            return undefined
        }
    },
    addToLibrary: async (title, description, cover) => {
        try {
            await pool.query("INSERT INTO library (title, description, cover)  VALUES ($1, $2, $3)",
                [title, description, cover]
            )
        } catch (err) {
            console.log(err);
            const errorMessage = "error adding book to library";
            return errorMessage;
        }
    }
}
import pool from "../config/db.js";
import axios from "axios";

export default {
    getSorted: async (sort) => {
        const allowedColumns = ['title', 'rating', 'date_read'];
        const validatedColumn = allowedColumns.includes(sort) ? sort : 'id';
        const result = await pool.query("SELECT * FROM library ORDER BY $1;", [validatedColumn]);
        return result.rows;
    },
    getUserBooks: async (userID) => {
        const result = await pool.query("SELECT * FROM library_test WHERE user_id = $1", [userID]);
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
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const result = await axios.get(`https://openlibrary.org/works/${key}.json`);
                return result.data;
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
    getBookFromLibrary: async (key, userId) => {
        try {
            const formattedKey = `/works/${key}`;
            const response = await pool.query("SELECT title, book_key, cover, rating FROM library_test WHERE book_key = $1 AND user_id = $2", 
                [formattedKey, userId]
            );
            return response.rows[0];
        } catch (err) {
            return err;
        }
    },
    addToLibrary: async (title, key, userID, cover, description) => {
        try {
            const response = await pool.query("INSERT INTO library_test (title, book_key, user_id, cover, description)  VALUES ($1, $2, $3, $4, $5) RETURNING title, user_id",
                [title, key, userID, cover, description]
            );

            return response.rows[0];
        } catch (err) {
            console.log(err);
            const errorMessage = "error adding book to library";
            return errorMessage;
        }
    },
    updateRating: async (key, userId, rating) => {
        const formattedKey = `/works/${key}`;
        try {
            const response = await pool.query("UPDATE library_test SET rating = $1 WHERE book_key = $2 AND user_id = $3 RETURNING rating",
                [rating, formattedKey, userId]
            );
            return response.rows[0];
        } catch(err) {
            return err;
        }
    },
    deleteFromLibrary: async (bookKey, userId) => {
        try {
            const fullKey = `/works/${bookKey}`;
            const response = await pool.query("DELETE FROM library_test WHERE book_key = $1 AND user_id = $2 RETURNING book_key",
                [fullKey, userId]
            );

            return response;

        } catch (err) {
            return err;
        }
    }
}
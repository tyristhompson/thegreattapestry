import pool from "../config/db.js";

export default {
    getNote: async (bookKey, userId) => {
        try {
            const fullKey = `/works/${bookKey}`;
            const response = await pool.query("SELECT note FROM notes WHERE book_key = $1 AND user_id = $2",
                [fullKey, userId]
            );

            if (response.rows.length > 0) {
                return response.rows[0];
            } else {
                return undefined
            }

        } catch (err) {
            return err;
        }
    },
    createNote: async (bookKey, userId, note) => {
        try {
            const fullKey = `/works/${bookKey}`;
            const response = pool.query("INSERT INTO notes (book_key, user_id, note)  VALUES ($1, $2, $3) RETURNING id",
                [fullKey, userId, note]
            );

            return response;
        } catch (err) {
            return err
        }
    },
    deleteNote: async (bookKey, userId) => {
        try {
            const fullKey = `/works/${bookKey}`;
            const response = await pool.query("DELETE FROM notes WHERE book_key = $1 AND user_id = $2 RETURNING id",
                [fullKey, userId]
            );

            return response;
        } catch (err) {
            return err;
        }
    },
    updateNote: async (bookKey, userId, note) => {
        try {
            const fullKey = `/works/${bookKey}`;
            const response = await pool.query("UPDATE notes SET note = $1 WHERE book_key = $2 AND user_id = $3 RETURNING id",
                [note, fullKey, userId]
            );

            return response;
        } catch (err) {
            return err;
        }
    }
};
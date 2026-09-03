import pool from "../config/db.js";

export default {
    getNote: async (bookKey, userId) => {
        try {
            const fullKey = `/works/${bookKey}`;
            const response = await pool.query("SELECT id, note, title FROM notes WHERE book_key = $1 AND user_id = $2",
                [fullKey, userId]
            );

            if (response.rows.length > 0) {
                return response.rows;
            } else {
                return undefined
            }

        } catch (err) {
            return err;
        }
    },
    createNote: async (bookKey, userId, title, note) => {
        try {
            const fullKey = `/works/${bookKey}`;
            const response = pool.query("INSERT INTO notes (book_key, user_id, note, title)  VALUES ($1, $2, $3, $4) RETURNING id, title, note",
                [fullKey, userId, note, title]
            );

            return response;
        } catch (err) {
            return err
        }
    },
    deleteNote: async (noteId, userId) => {
        try {
            const response = await pool.query("DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING id",
                [noteId, userId]
            );

            return response;
        } catch (err) {
            return err;
        }
    },
    updateNote: async (noteId, userId, title, note) => {
        try {
            const response = await pool.query("UPDATE notes SET note = $1, title= $2 WHERE id = $3 AND user_id = $4 RETURNING id, title, note",
                [note, title, noteId, userId]
            );

            return response;
        } catch (err) {
            return err;
        }
    }
};
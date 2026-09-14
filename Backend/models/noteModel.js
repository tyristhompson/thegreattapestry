import pool from "../config/db.js";

export default {
    getNote: async (bookKey, userId) => {
        try {
            const fullKey = `/works/${bookKey}`;
            const response = await pool.query("SELECT id, note, title, tags, date FROM notes WHERE book_key = $1 AND user_id = $2",
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
    createNote: async (bookKey, userId, title, note, tags) => {
        try {
            const fullKey = `/works/${bookKey}`;
            const response = pool.query("INSERT INTO notes (book_key, user_id, note, title, tags)  VALUES ($1, $2, $3, $4, $5::text[]) RETURNING id, title, note, tags, date",
                [fullKey, userId, note, title, tags]
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
    updateNote: async (noteId, userId, title, note, tags) => {
        try {
            const response = await pool.query("UPDATE notes SET note = $1, title= $2, tags = $3::text[] WHERE id = $4 AND user_id = $5 RETURNING id, title, note, tags",
                [note, title, tags, noteId, userId]
            );
            return response;
        } catch (err) {
            console.log(err)
            return err;
        }
    },
};
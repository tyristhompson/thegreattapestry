import axios from "axios";

const bannedChar = ["@", "#", "$", "&", "*", "!", "%", "?", "/", "\\", "'", "\"", "`", "~"];
const errorMessages =
    ["Please only include allowed special characters.",
        "Username must be between 3 to 12 characters",
        "Password must contain at least one number and one special character",
        "Password must be between 9 to 25 characters",
        "Please enter a valid email",
        "Couldn't complete your request. Please try again."
    ];

const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:3000/user/me", {
            withCredentials: true,
        });
        console.log(response.data.user)
        return response.data.user;
    } catch (err) {
        return false;
    }
};

const getLibrary = async () => {
    try {
        const response = await axios.get("http://localhost:3000/books/library", {
            withCredentials: true,
        });
        return response.data.library;
    } catch (err) {
        console.log("error fetching library:", err)
        return undefined;
    }
};

const logOut = async () => {
    try {
        const response = await axios.post("http://localhost:3000/user/logout", {}, {
            withCredentials: true,
        });
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }

    } catch (err) {
        return err;
    }
};

const fetchBookInfo = async (key) => {
    try {
        const response = await axios.get(`http://localhost:3000/books/info/${key}`, {
            withCredentials: true,
        });

        return response.data.book;

    }
    catch (err) {
        return err;
    }
};

const getBookFromLibrary = async (key) => {
    try {
        const response = await axios.get(`http://localhost:3000/books/utils/${key}`, {
            withCredentials: true,
        });
        return response.data.book;
    }
    catch (err) {
        return err;
    }
};

const updateRating = async (key, rating) => {
    try {
        const response = await axios.patch(`http://localhost:3000/books/update/${key}`, {
            rating: rating,
        }, { withCredentials: true});

        return response.data.rating;
    } catch (err) {
        return err;
    }
}

const deleteBook = async (key) => {
    try {
        const response = await axios.delete(`http://localhost:3000/books/delete/${key}`, {
            withCredentials: true,
        });
        return response;
    } catch (err) {
        return err;
    }
};

const fetchNotes = async (key) => {
    try {
        const response = await axios.get(`http://localhost:3000/notes/${key}`, {
            withCredentials: true,
        });
        return response.data.notes;
    } catch (err) {
        return err;
    }
};

const createNote = async (key, title, tags, note) => {
    try {
        const response = await axios.post(`http://localhost:3000/notes/create/${key}`, {
            title: title,
            note: note,
            tags: tags,
        }, {
            withCredentials: true, 
        });
        return response.data.added.rows[0];
    } catch (err) {
        return err;
    }
};

const updateNote = async (noteId, title, tags, note) => {
    try {
        const response = await axios.patch(`http://localhost:3000/notes/update/${noteId}`, {
            title: title,
            note: note,
            tags: tags,
        }, {
            withCredentials: true,
        });

        return response.data.updated.rows[0];
    } catch (err) {
        return err;
    }
};

const deleteNote = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/notes/delete/${id}`, {
            withCredentials: true,
        });
        return response;
    } catch (err) {
        return err;
    }
};

const getTags = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/notes/tags/${id}`, {
            withCredentials: true,
        });
        return response.data.tags.rows[0].tags;
    } catch (err) {
        return err;
    }
};

const updateTags = async (id, tags) => {
    try {
        const response = await axios.patch(`http://localhost:3000/notes/tags/patch/${id}`, {
            tags: tags,
        }, {
            withCredentials: true,
        });

        return response.data.tags
    } catch (err) {
        return err;
    }
};

export { 
    bannedChar, 
    errorMessages, 
    getUser, 
    getLibrary, 
    getBookFromLibrary,
    updateRating,
    logOut, 
    fetchBookInfo, 
    deleteBook, 
    createNote, 
    fetchNotes, 
    updateNote,
    deleteNote,
    getTags,
    updateTags,
 };
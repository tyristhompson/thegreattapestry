import { useNavigate } from "react-router";
import { fetchBookInfo, deleteBook, createNote, fetchNote, updateNote } from "../Utlities";
import { useEffect, useState } from "react";

function Notes() {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [noteExists, setNoteExists] = useState(false);
    const bookKey = JSON.parse(localStorage.getItem("book"));
    const [bookDetails, setBookDetails] = useState({});

    useEffect(() => {
        fetchBookInfo(bookKey).then((info) => {
            setBookDetails(info)
        });
    }, []);

    useEffect(() => {
        fetchNote(bookKey).then((note) => {
            if (note) {
                setInput(note)
                setNoteExists(true)
            } else {
                setNoteExists(false)
            }
        });
    }, []);

    function updateInput(event) {
        const value = event.target.value;
        setInput(value);
    };

    async function removeFromLibrary() {
        try {
            const response = await deleteBook(bookKey);
            if (response.status === 200) {
                navigate("/profile")
            } else {
                console.log(response)
            }
        } catch (err) {
            console.log(err)
        }
    };

    async function saveNote(bookKey, note) {
        try {
            if (noteExists) {
                const response = await updateNote(bookKey, note);
                if (response.status === 200) {
                    console.log("success")
                } else {
                    console.log(response)
                }
            } else {
                setNoteExists(true)
                const response = await createNote(bookKey, note);
                if (response.status === 200) {
                    console.log("success")
                } else {
                    console.log(response)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <h2>{bookDetails.title}</h2>
            <img src={`https://covers.openlibrary.org/b/id/${bookDetails.cover}-M.jpg`} alt={bookDetails.title + " " + "book cover"} />
            <input type="text" onChange={updateInput} value={input} />
            <button onClick={removeFromLibrary}>Remove From Library</button>
            <button onClick={() => { saveNote(bookKey, input) }}>Save Note</button>
            <button onClick={() => { navigate("/profile") }}>Back</button>
        </>
    )
};

export default Notes;
import styles from "./Notes.module.css"
import { useNavigate } from "react-router";
import { fetchBookInfo, deleteBook, createNote, fetchNote, updateNote } from "../Utlities";
import { useEffect, useState } from "react";
import Annotation from "./Annotation";
import Rating from "./Rating";

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
            <div className={styles.container}>
                <div className={styles.bookInfo}>
                    <div className={styles.bookUtils}>
                        <button onClick={() => { navigate("/profile") }} className={styles.bookActions}>
                            <img src="/images/back.svg" alt="" />
                        </button>
                        <button className={styles.bookActions}>
                            <img src="/images/image-square.svg" alt="" />
                        </button>
                        <button onClick={removeFromLibrary} className={styles.bookActions}>
                            <img src="/images/delete-book.svg" alt="" />
                        </button>
                    </div>
                    <img src={`https://covers.openlibrary.org/b/id/${bookDetails.cover}-M.jpg`} alt={bookDetails.title + " " + "book cover"} />
                    <h2>{bookDetails.title}</h2>
                    <Rating />
                </div>
                <div className={styles.searchAndSortContainer}>
                    <div className={styles.searchContainer}>
                        <img className={styles.searchImg} src="/images/search-outline.svg" alt="" />
                        <input className={styles.search} type="text" />
                    </div>
                    <div className={styles.sortContainer}>
                        <div className={styles.utilImageContainer}>
                            <img className={styles.utils} src="/images/add.svg" alt="" />
                        </div>
                        <div className={styles.utilImageContainer}>
                            <img className={styles.utils} src="/images/filter.svg" alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles.annotationGrid}>
                    <Annotation />
                    <Annotation />
                    <Annotation />
                    <Annotation />
                    <Annotation />
                </div>
            </div>
        </>
    )
};

export default Notes;
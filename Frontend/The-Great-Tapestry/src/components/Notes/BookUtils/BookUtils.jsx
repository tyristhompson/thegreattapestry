import styles from "../Notes.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { deleteBook, fetchBookInfo } from "../../Utlities";
import Rating from "./Rating";

function BookUtils() {
    const bookKey = JSON.parse(localStorage.getItem("book"));
    const [bookDetails, setBookDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookInfo(bookKey).then((info) => {
            setBookDetails(info)
        });
    }, []);

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

    return (
        <>
            <div className={styles.bookInfo}>
                <div className={styles.bookUtils}>
                    <button onClick={() => { navigate("/profile") }} className={styles.bookActions}>
                        <img src="/images/back.svg" alt="" />
                        <p className={styles.tooltip}>Back</p>
                    </button>
                    <button className={styles.bookActions}>
                        <img src="/images/image-square.svg" alt="" />
                        <p className={styles.tooltip}>Add Background Image</p>
                    </button>
                    <button onClick={removeFromLibrary} className={styles.bookActions}>
                        <img src="/images/delete-book.svg" alt="" />
                        <p className={styles.tooltip}>Remove From Library</p>
                    </button>
                </div>
                <img src={`https://covers.openlibrary.org/b/id/${bookDetails.cover}-M.jpg`} alt={bookDetails.title + " " + "book cover"} />
                <h2>{bookDetails.title}</h2>
                <Rating />
            </div>
        </>
    )
};

export default BookUtils;
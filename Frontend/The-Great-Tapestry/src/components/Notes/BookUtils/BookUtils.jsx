import styles from "../Notes.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { deleteBook, getBookFromLibrary, updateRating } from "../../Utlities";
import Rating from "./Rating/Rating";

function BookUtils() {
    const bookKey = JSON.parse(localStorage.getItem("book"));
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [rating, setRating] = useState(0);
    const [bookDetails, setBookDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getBookFromLibrary(bookKey).then((info) => {
            setBookDetails(info)
            setTitle(info.title);
            setCover(info.cover);
            setRating(info.rating);
        });
    }, []);

    async function changeRating (newRating) {
        try {
            const response = await updateRating(bookKey, newRating);
            setRating(response.rating);
        } catch (err) {
            return err;
        }
    }

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
                <img src={bookDetails?.cover ?`https://covers.openlibrary.org/b/id/${cover}-M.jpg` : "./images/call-me-by-your-name.jpg"} alt={bookDetails.title + " " + "book cover"} />
                <h2>{title}</h2>
                <Rating bookRating={rating} changeRating={(newRating) => {changeRating(newRating)}}/>
            </div>
        </>
    )
};

export default BookUtils;
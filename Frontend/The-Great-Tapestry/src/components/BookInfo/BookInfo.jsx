import styles from "./BookInfo.module.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { fetchBookInfo } from "../Utlities.js"
import { useEffect, useState } from "react";
import Description from "./Description.jsx";

function BookInfo() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const bookKey = JSON.parse(localStorage.getItem("book"));
    const [bookDetails, setBookDetails] = useState({});

    useEffect(() => {
        setIsLoading(true);
        fetchBookInfo(bookKey).then((info) => {
            setBookDetails(info)
            setIsLoading(false)
        });
    }, []);

    async function addToLibrary() {
        try {
            await axios.post("http://localhost:3000/books/add", {
                title: bookDetails.title,
                cover: bookDetails.cover,
                description: bookDetails.description?.value ? bookDetails.description.value : bookDetails.description,
                key: bookDetails.key
            }, {
                withCredentials: true,
            });
        } catch (err) {
            console.log(err);
        }

    };


    return (
        <>
            <div className={styles.container}>
                <div className={styles.coverContainer}>
                    <img src={`https://covers.openlibrary.org/b/id/${bookDetails.cover}-M.jpg`} alt={bookDetails.title + " " + "book cover"} />
                </div>
                <div className={styles.infoContainer}>
                    <h2 className={styles.title}>{bookDetails.title}</h2>
                    {
                        isLoading ? <p>...</p> :
                        <Description value={bookDetails.description?.value ? bookDetails.description.value : bookDetails.description}/>
                    }
                    <div className={styles.addToLibrary}>
                        <button className={styles.darkButton} onClick={addToLibrary}>Add</button>
                        <button className={styles.clearButton} onClick={() => { navigate("/search") }}>Back</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookInfo;
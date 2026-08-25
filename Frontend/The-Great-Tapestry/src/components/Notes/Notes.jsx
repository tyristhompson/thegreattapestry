import styles from "./Notes.module.css"
import { useNavigate } from "react-router";
import { fetchBookInfo, deleteBook, createNote, fetchNote, updateNote } from "../Utlities";
import { useEffect, useState } from "react";
import Annotation from "./Annotation";
import Rating from "./Rating";
import EditText from "./EditText";

function Notes() {
    const navigate = useNavigate();
    const bookKey = JSON.parse(localStorage.getItem("book"));
    const [bookDetails, setBookDetails] = useState({});
    const [annotations, setAnnotations] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

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

    function addAnnotation() {
        setModalOpen(true);
    }

    return (
        <>
            <div className={styles.container}>
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
                <div className={styles.searchAndSortContainer}>
                    <div className={styles.searchContainer}>
                        <img className={styles.searchImg} src="/images/search-outline.svg" alt="" />
                        <input className={styles.search} type="text" />
                    </div>
                    <div className={styles.sortContainer}>
                        <div onClick={addAnnotation} className={styles.utilImageContainer}>
                            <img className={styles.utils} src="/images/add.svg" alt="" />
                            <p className={styles.tooltip}>Add Annotation</p>
                        </div>
                        <div className={styles.utilImageContainer}>
                            <img className={styles.utils} src="/images/filter.svg" alt="" />
                            <p className={styles.tooltip}>Filter</p>
                        </div>
                    </div>
                    <EditText isOpen={modalOpen} onClose={() => {setModalOpen(false)}}/>
                </div>
                {
                    annotations.length > 0 ?
                        <>
                            <div className={styles.annotationGrid}>
                                {
                                    annotations.map((annotation) => {
                                        return (
                                            <Annotation 
                                            key={annotation.index} 
                                            title={annotation.title} 
                                            text={annotation.text} 
                                            />
                                        )
                                    })
                                }
                            </div>
                        </> :
                    <h3>Create an Annotation to see it here!</h3>
                }
            </div>
        </>
    )
};

export default Notes;
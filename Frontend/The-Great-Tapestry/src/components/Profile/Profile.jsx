import styles from "./Profile.module.css";
import { AuthContext } from "../../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import { getUser, getLibrary, logOut } from "../Utlities";
import { useNavigate } from "react-router";

function Profile() {
    const navigate = useNavigate();
    const { authUser, setAuthUser } = useContext(AuthContext);
    const [library, setLibrary] = useState([]);

    useEffect(() => {
        if (!authUser) {
            getUser().then((user) => {
                user === false ? navigate("/login") : setAuthUser(user);
            });
        }
    }, []);

    useEffect(() => {
        getLibrary().then((library) => {
            setLibrary(library)
        });
    }, [authUser])

    async function handleLogout() {
        const logOutSuccessful = await logOut();
        logOutSuccessful ? navigate("/") : navigate("/profile");
    }

    function setBookInfo(bookKey) {
        const keyLength = bookKey.length;
        const configuredKey = bookKey.slice(-(keyLength - 7));

        localStorage.setItem("book", JSON.stringify(configuredKey));
        navigate("/profile/book/notes");
    };

    return (
        <>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h2>
                        {authUser ? authUser.username + "'s" : ""} Tapestry
                    </h2>
                    <div className={styles.directory}>
                        <p onClick={handleLogout}>Logout</p>
                        <button className={styles.clearButton}><a href="/search">Search Catalog</a></button>
                    </div>
                </header>
                {
                    library.length > 0 ?
                        <>
                            <div className={styles.libraryContainer}>
                                <div className={styles.sort}>
                                    <form action="/profile">
                                        <label htmlFor="sort">Sort</label>

                                        <select name="sort" id="sort">
                                            <option value="" disabled selected hidden></option>
                                            <option value="title">Title</option>
                                            <option value="rating">Rating</option>
                                            <option value="date">Recent</option>

                                        </select>
                                        <button type="submit">Apply Filter</button>
                                    </form>
                                </div>
                                <div className={styles.library}>
                                    {
                                        library.map((book) => {
                                            return (
                                                <img
                                                    key={book.id}
                                                    className={styles.bookCover}
                                                    src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`}
                                                    alt={book.title + " " + "book cover"}
                                                    onClick={() => { setBookInfo(book.book_key) }}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                        :
                        <div className={styles.emptyLibrary}>
                            <h2 className={styles.hero}>Start Your Collection</h2>
                            <p>Your Library is currently empty. Search our catalog to start weaving your tapestry.</p>
                        </div>
                }
            </div>
        </>
    )
}

export default Profile;
import styles from "./Profile.module.css";
import { AuthContext } from "../../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import { getUser, getLibrary } from "../Utlities";
import { useNavigate } from "react-router";

function Profile() {
    const navigate = useNavigate();
    const { authUser, setAuthUser } = useContext(AuthContext);
    const [library, setLibrary] = useState([]);

    useEffect(() => {
        if (!authUser) {
            getUser().then((user) => {
                user === false ? navigate("/login") : setAuthUser(user);
                console.log(user);
            });
        }
    }, []);

    useEffect(() => {
        getLibrary().then((library) => {
            setLibrary(library)
        });
    }, [authUser])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>
                        {authUser ? authUser.username + "'s" : ""} Tapestry
                    </h2>
                    <button className={styles.clearButton}><a href="/search">Search Catalog</a></button>
                </div>
                {
                    library.length > 0 ?
                        <div className={styles.library}>
                            {
                                library.map((book) => {
                                    return (
                                        <img
                                            key={book.id}
                                            className={styles.bookCover}
                                            src={book.cover}
                                            alt={book.title + "book cover"}
                                        />
                                    )
                                })
                            }
                        </div> :
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
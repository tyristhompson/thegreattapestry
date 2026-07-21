import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Profile(props) {
    const { username } = props.user;
    const [selectedValue, setSelectedValue] = useState("");
    const [library, setLibrary] = useState([]);

    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                const response = await axios.get("http://localhost:3000/profile");
                setLibrary([...response.data.library])
                console.log(response.data);

            } catch (error) {
                console.log("error fetching data:", error)
            }
        };

        fetchLibrary();
    }, []);

    function changeValue(event) {
        setSelectedValue(event.target.value);
    }

    async function getLibrary(event) {
        event.preventDefault();

        if (selectedValue !== "") {
            try {
                const response = await axios.get("http://localhost:3000/profile", {
                    params: {
                        sort: selectedValue,
                    }
                });
                setLibrary([...response.data.library])

            } catch (error) {
                console.log("error fetching data:", error)
            }
        } else {
            console.log("No value sent to the api")
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>
                        {username + "'s"} Tapestry
                    </h2>
                    <button className={styles.clearButton}><a href="/search">Search Catalog</a></button>
                </div>
                <div className="sort">
                    <form onSubmit={getLibrary}>
                        <label htmlFor="sort">Sort</label>

                        <select name="sort" value={selectedValue} onChange={changeValue} id="sort">
                            <option defaultValue="" disabled hidden>{""}</option>
                            <option value="title">Title</option>
                            <option value="rating">Rating</option>
                            <option value="date">Recent</option>

                        </select>
                        <button>Apply Filter</button>
                    </form>
                </div>
                <div className={library.length > 0 ? styles.library : styles.emptyLibrary}>
                    {library.length > 0 ?
                        library.map(
                            (book) => { return <img key={book.id} className={styles.bookCover} src={book.cover} alt={book.title + " book cover"}></img> }
                        ) :
                        <>
                            <h2 className={styles.hero}>Start Your Collection</h2>
                            <p>{"You're Library is currently empty. Search our catalog to start weaving your tapestry."}</p>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Profile;
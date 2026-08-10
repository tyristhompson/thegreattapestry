import styles from "./Search.module.css";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router";

function Search() {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [input, setInput] = useState("");

    function updateInput(event) {
        const value = event.target.value;
        setInput(value);
    }

    async function getSearch(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/books/search", { search: input });
            const filteredBooks = response.data.books.filter(book => book.cover_i);
            setSearchResults(filteredBooks);
        } catch (err) {
            console.log(err);
        }
    }

    function setBookInfo(bookKey) {
        const keyLength = bookKey.length;
        const configuredKey = bookKey.slice(-(keyLength - 7));

        localStorage.setItem("book", JSON.stringify(configuredKey));
        navigate("/book/info");
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>
                        The Great Tapestry
                    </h2>
                    <div className={styles.directory}>
                        <p onClick={() => {navigate("/profile")}}>Profile</p>
                    </div>
                </div>
                <form className={styles.searchForm} onSubmit={getSearch} >
                    <label htmlFor="search"></label>
                    <input
                        className={styles.searchBar}
                        onChange={updateInput}
                        type="text" name="search"
                        placeholder="Search Catalog"
                        value={input}
                    />
                    <button className={styles.clearButton} type="submit">
                        <img 
                        className={styles.searchImg} src="./images/search-outline.svg" alt="" />
                    </button>
                </form>
                <div className={styles.searchResultsGrid}>
                    {
                        searchResults.length > 0 && searchResults.map((book) => {
                            return (
                                <img
                                    key={book.key}
                                    onClick={() => {setBookInfo(book.key)}}
                                    className={styles.bookCover}
                                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                                    alt={book.title + " " + "book cover"}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Search;
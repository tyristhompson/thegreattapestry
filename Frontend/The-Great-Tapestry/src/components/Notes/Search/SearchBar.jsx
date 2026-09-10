import { useState } from "react";
import styles from "../Notes.module.css";

function SearchBar({ findNoteBySubString }) {
    const [input, setInput] = useState("");
    
    function updateInput(event) {
        const newValue = event.target.value;
        setInput(newValue);
        findNoteBySubString(newValue);
    };

    return (
        <>
            <div className={styles.searchContainer}>
                <img className={styles.searchImg} src="/images/search-outline.svg" alt="" />
                <input className={styles.search} type="text" value={input} onChange={updateInput} />
            </div>
        </>
    )
};

export default SearchBar;
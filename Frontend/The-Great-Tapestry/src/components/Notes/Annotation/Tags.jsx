import styles from "../TextEditor/EditText.module.css";
import { useState } from "react";


function Tags({ tagName }) {
    const [tags, setTags] = useState([]);

    function addTag(newTag) {
        setTags((prev) => [...prev, newTag])
    };

    function deleteTag(tag) {

    }

    return (
        <>
            <div className={styles.tagsContainer}>
                {
                    tags?.length < 4 &&
                    <p className={styles.tag} onClick={() => { addTag("test") }}>+ Add tag</p>
                }
                {
                    tags?.length > 0 &&
                    tags.map((tag) => {
                        return (
                            <>
                                <div className={styles.tag} key={tag}>
                                    <p>{tag}</p>
                                    <button onClick={() => {deleteTag(tag)}}>
                                        <svg className={styles.close} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                                    </button>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
};

export default Tags;
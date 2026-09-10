import { useState } from "react";
import styles from "../Notes.module.css";
import EditText from "../TextEditor/EditText";
import SearchBar from "./SearchBar";

function SearchAndSort({ updateAnnotationGrid, findNoteBySubString }) {
    const [modalOpen, setModalOpen] = useState(false);
    const initialText = '<p>Start creating your thread.</p>';
    const [savedTags, setSavedTags] = useState([]);

    function addAnnotation() {
        setModalOpen(true);
    }

    return (
        <>
            <div className={styles.searchAndSortContainer}>
                <SearchBar
                    findNoteBySubString={findNoteBySubString}
                />
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
                {
                    modalOpen && <EditText
                        saveAnnotation={updateAnnotationGrid}
                        initialContent={initialText}
                        savedTags={savedTags}
                        setSavedTags={(tags) => setSavedTags(tags)}
                        isEditing={false}
                        isOpen={modalOpen}
                        onClose={() => { setModalOpen(false) }}
                    />
                }
            </div>
        </>
    )
};

export default SearchAndSort;
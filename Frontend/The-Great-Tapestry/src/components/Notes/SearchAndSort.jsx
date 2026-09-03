import { useState } from "react";
import styles from "./Notes.module.css";
import EditText from "./TextEditor/EditText";

function SearchAndSort({ updateAnnotationGrid }) {
    const [modalOpen, setModalOpen] = useState(false);
    const initialText = '<p>Start creating your thread.</p>';

     function addAnnotation() {
        setModalOpen(true);
    }

    return (
        <>
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
                {
                    modalOpen && <EditText
                        saveAnnotation={updateAnnotationGrid}
                        initialContent={initialText}
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
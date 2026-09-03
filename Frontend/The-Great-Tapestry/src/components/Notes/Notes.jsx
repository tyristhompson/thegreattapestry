import styles from "./Notes.module.css"
import BookUtils from "./BookUtils/BookUtils";
import AnnotationGrid from "./AnnotationGrid";

function Notes() {
    
    return (
        <>
            <div className={styles.container}>
                <BookUtils />
                <AnnotationGrid />
            </div>
        </>
    )
};

export default Notes;
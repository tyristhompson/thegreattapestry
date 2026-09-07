import styles from "./Notes.module.css"
import { useState, useEffect } from "react";
import { fetchNotes } from "../Utlities";
import SearchAndSort from "./SearchAndSort";
import Annotation from "./Annotation/Annotation";
import ConfirmDelete from "./Annotation/ConfirmDelete";


function AnnotationGrid() {
    const bookKey = JSON.parse(localStorage.getItem("book"));
    const [annotations, setAnnotations] = useState([]);
    const [deletionId, setDeletionId] = useState(undefined);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchNotes(bookKey).then((notes) => {
            setAnnotations(notes)
        });
    }, []);

    function updateAnnotationGrid(newAnnotation) {
        setAnnotations(prev => [...prev, newAnnotation]);
    }

    async function deleteAnnotation(annotationId) {
        setModalOpen(true);
        setDeletionId(annotationId);
    }

    return (
        <>
            <SearchAndSort updateAnnotationGrid={updateAnnotationGrid} />
            {
                annotations?.length > 0 ?
                    <>
                        <div className={styles.annotationGrid}>
                            {
                                annotations.map((annotation) => {
                                    return (
                                        <Annotation
                                            key={annotation.id}
                                            id={annotation.id}
                                            title={annotation.title}
                                            text={annotation.note}
                                            deleteAnnotation={deleteAnnotation}
                                        />
                                    )
                                })
                            }
                            {
                                modalOpen &&
                                <ConfirmDelete
                                    annotations={annotations}
                                    setAnnotations={setAnnotations}
                                    id={deletionId}
                                    isOpen={modalOpen}
                                    onClose={() => { setModalOpen(false) }}
                                />
                            }
                        </div>
                    </> :
                    <h3>Create an Annotation to see it here!</h3>
            }
        </>
    )
};

export default AnnotationGrid;
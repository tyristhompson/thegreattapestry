import styles from "./Notes.module.css"
import { useState, useEffect } from "react";
import { fetchNotes, deleteNote } from "../Utlities";
import SearchAndSort from "./SearchAndSort";
import Annotation from "./Annotation/Annotation"


function AnnotationGrid () {
    const bookKey = JSON.parse(localStorage.getItem("book"));
    const [annotations, setAnnotations] = useState([]);

    useEffect(() => {
        fetchNotes(bookKey).then((notes) => {
            setAnnotations(notes)
        });
    }, []);

    function updateAnnotationGrid(newAnnotation) {
            setAnnotations(prev => [...prev, newAnnotation]);
    }

    async function deleteAnnotation(annotationId) {
        try {
            const response = await deleteNote(annotationId);
            if (response.status === 200) {
                const newAnnotationArray = annotations.filter(annotation => annotation.id !== annotationId);
                setAnnotations(newAnnotationArray);
            } else {
                console.log(response)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
        <SearchAndSort updateAnnotationGrid={updateAnnotationGrid}/>
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
                            </div>
                        </> :
                        <h3>Create an Annotation to see it here!</h3>
                }
        </>
    )
};

export default AnnotationGrid;
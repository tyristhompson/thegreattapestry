import styles from "./Notes.module.css"
import Annotation from "./Annotation/Annotation";

function AnnotationGrid({ annotations, searchString, deleteAnnotation, updateAnnotationGrid }) {
    return (
        <>
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
                                            tags={annotation.tags}
                                            deleteAnnotation={deleteAnnotation}
                                            saveAnnotation={updateAnnotationGrid}
                                        />
                                    )
                                })
                            }
                        </div>
                    </> :
                    <h3>{searchString?.length > 0 ? "No Annotations match your search." : "Create an Annotation to see it here!"}</h3>
            }
        </>
    )
};

export default AnnotationGrid;
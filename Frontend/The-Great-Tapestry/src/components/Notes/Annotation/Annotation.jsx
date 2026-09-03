import { useState } from "react";
import styles from "./Annotation.module.css";
import TextPreview from "./TextPreview";
import EditText from "../TextEditor/EditText";

function Annotation({ id, title, text, deleteAnnotation }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState(title);
    const [initialContent, setInitialContent] = useState(text);

    function updateAnnotationPreview(newTitle, newNote) {
        setPreviewTitle(newTitle);
        setInitialContent(newNote);
    }


    return (
        <>
            <div className={styles.noteContainer}>
                <div className={styles.title}>
                    <h3 className={styles.title}>{previewTitle}</h3>
                    <div className={styles.iconContainer}>
                        <div className={styles.deleteContainer}>
                            <svg onClick={() => { deleteAnnotation(id) }} className={`${styles.icon}, ${styles.delete}`} viewBox="0 0 24 24" width="1.3rem " height="1.3rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            <p className={styles.tooltip}>Delete</p>
                        </div>
                        <div className={styles.editContainer}>
                            <svg onClick={() => setModalOpen(true)} className={`${styles.icon}, ${styles.edit}`} viewBox="0 0 24 24" width="1.3rem " height="1.3rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M21 21H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            <p className={styles.tooltip}>Edit</p>
                        </div>
                    </div>
                </div>
                <div className={styles.annotationContainer}>
                    <TextPreview initialContent={initialContent} /> 
                    {
                        modalOpen &&
                            <EditText
                                noteId={id}
                                title={previewTitle}
                                initialContent={initialContent}
                                onContentChange={(newTitle, newNote) => {updateAnnotationPreview(newTitle, newNote)}}
                                isEditing={true}
                                isOpen={modalOpen}
                                onClose={() => { setModalOpen(false) }}
                            />
                    }
                </div>
            </div>
        </>
    )
};

export default Annotation;
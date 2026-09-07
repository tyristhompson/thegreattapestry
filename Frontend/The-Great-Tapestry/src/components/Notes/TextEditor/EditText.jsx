import { useEffect, useRef } from "react";
import styles from "./EditText.module.css";
import Tiptap from "./Tiptap";
import Tags from "../Annotation/Tags";



function EditText({ isOpen, onClose, saveAnnotation, initialContent, title, isEditing, onContentChange, noteId }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    return (
        <dialog className={styles.modal} ref={dialogRef} onClose={onClose}>
            <div className={styles.container}>
                <div className={styles.modalUtils}>
                    <div className={styles.tagsContainer}>
                            <Tags />
                        </div>
                    <button onClick={onClose}>
                        <svg className={styles.close} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                    </button>
                </div>
    
                <Tiptap isEditing={isEditing} initialContent={initialContent} title={title} saveAnnotation={saveAnnotation} onContentChange={onContentChange} noteId={noteId}/>
            </div>
        </dialog>
    )
}

export default EditText;
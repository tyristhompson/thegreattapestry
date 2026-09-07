import { useEffect, useRef } from "react";
import { deleteNote } from "../../Utlities";
import styles from "./ConfirmDelete.module.css";

function ConfirmDelete({ annotations, setAnnotations, id, isOpen, onClose }) {

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

    async function deleteAnnotation() {
        try {
            const response = await deleteNote(id);
            if (response.status === 200) {
                const newAnnotationArray = annotations.filter(annotation => annotation.id !== id);
                setAnnotations(newAnnotationArray);
                onClose();
            } else {
                console.log(response)
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <>
            <dialog className={styles.modal} ref={dialogRef} onClose={onClose}>
                <button onClick={onClose}>
                    <svg className={styles.close} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                </button>
                <div className={styles.deleteMessageContainer}>
                    <p>Delete Annotation?</p>
                    <div className={styles.deletionUtils}>
                        <button className={styles.cancel} onClick={onClose}>Cancel</button>
                        <button className={styles.delete} onClick={deleteAnnotation}>Delete</button>
                    </div>
                </div>
            </dialog>
        </>
    )
};

export default ConfirmDelete;


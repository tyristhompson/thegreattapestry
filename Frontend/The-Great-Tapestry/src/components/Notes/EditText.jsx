import { useEffect, useRef } from "react";
import styles from "./EditText.module.css";
import Tiptap from "./TipTap";



function EditText ({ isOpen, onClose }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if(!dialog) return;

        if(isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    return (
        <dialog className={styles.modal} ref={dialogRef} onClose={onClose}>
           <Tiptap />
           <button onClick={onClose}>close</button>
        </dialog>
    )
}

export default EditText;
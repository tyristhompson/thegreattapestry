import styles from '../Tiptap.module.css';
import { useEditorState } from '@tiptap/react';

function Italic({ editor }) {

    const { isItalic } = useEditorState({
        editor,
        selector: ctx => ({
            isItalic: ctx.editor.isActive('italic') ?? false,
        }),
    });

    return (
        <>
            <button onClick={() => {
               editor.chain().focus().toggleItalic().run();
            }}>
                <svg className={[styles.styleIcon, isItalic && styles.selected].join(" ")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.8719999999999999" strokeLinecap="round" strokeLinejoin="round"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <line x1="19" y1="4" x2="10" y2="4"></line> <line x1="14" y1="20" x2="5" y2="20"></line> <line x1="15" y1="4" x2="9" y2="20"></line> </g></svg>
            </button>
        </>
    )
};

export default Italic;
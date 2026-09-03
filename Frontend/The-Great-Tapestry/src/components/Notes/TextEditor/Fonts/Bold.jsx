import styles from '../Tiptap.module.css';
import { useEditorState } from '@tiptap/react';

function Bold({ editor }) {

    const { isBold } = useEditorState({
        editor,
        selector: ctx => ({
            isBold: ctx.editor.isActive('bold') ?? false,
        }),
    });

    return (
        <>
            <button onClick={() => {
                editor.chain().focus().toggleBold().run();
            }}>
                <svg className={[styles.styleIcon, isBold && styles.selected].join(" ")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"></path> <path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"></path> </g></svg>
            </button>
        </>
    )
};

export default Bold;
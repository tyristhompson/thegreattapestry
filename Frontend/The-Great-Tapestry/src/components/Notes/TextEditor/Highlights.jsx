import { useEditorState } from "@tiptap/react";
import styles from './Tiptap.module.css';

function Highlights({ editor }) {
    
     const editorState = useEditorState({
        editor,
        selector: ctx => ({
            isHighlight: ctx.editor.isActive('highlight') ?? false,
            isOrange: ctx.editor.isActive('highlight', { color: '#ffc078' }) ?? false,
            isGreen: ctx.editor.isActive('highlight', { color: '#8ce99a' }) ?? false,
            isBlue: ctx.editor.isActive('highlight', { color: '#74c0fc' }) ?? false,
            isPurple: ctx.editor.isActive('highlight', { color: '#b197fc' }) ?? false,
            isLightRed: ctx.editor.isActive('highlight', { color: '#ffa8a8' }) ?? false,
        }),
    });

    return (
        <>
            <div className={styles.buttonsContainer}>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()}
                >
                    <div className={[styles.highlightColorButton, styles.orange, editorState.isOrange && styles.hlSelected].join(" ")}></div>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()}
                >
                    <div className={[styles.highlightColorButton, styles.green, editorState.isGreen && styles.hlSelected].join(" ")}></div>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()}
                >
                    <div className={[styles.highlightColorButton, styles.blue, editorState.isBlue && styles.hlSelected].join(" ")}></div>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight({ color: '#b197fc' }).run()}
                >
                    <div className={[styles.highlightColorButton, styles.purple, editorState.isPurple && styles.hlSelected].join(" ")}></div>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffa8a8' }).run()}
                >
                    <div className={[styles.highlightColorButton, styles.red, editorState.isLightRed && styles.hlSelected].join(" ")}></div>
                </button>
            </div>
        </>
    )
};

export default Highlights;
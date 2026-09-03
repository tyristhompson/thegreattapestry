import styles from './Tiptap.module.css';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import EditorUtils from './EditorUtils';
import { useState } from 'react';

function Tiptap({ saveAnnotation, initialContent, title, isEditing, onContentChange, noteId }) {
    const [input, setInput] = useState(title);

    function updateTitle(event) {
        const value = event.target.value;
        setInput(value);
    };

    const editor = useEditor({
        extensions: [StarterKit, Highlight.configure({ multicolor: true })], // define your extension array
        content: initialContent, // initial content
        autofocus: true,
    });

    if (!editor) {
        return null
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.titleAndUtilsContainer}>
                    <input className={styles.title} onChange={updateTitle} type="text" name="title" id="" value={input} />
                    <EditorUtils noteTitle={input} isEditing={isEditing} noteId={noteId} saveAnnotation={saveAnnotation} onContentChange={onContentChange} editor={editor} />
                </div>
                <div className={styles.editorContainer}>
                    <EditorContent editor={editor} />
                </div>
            </div>
        </>
    )
}

export default Tiptap






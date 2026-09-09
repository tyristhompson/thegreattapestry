import styles from './Tiptap.module.css';
import Highlights from './Highlights';
import Fonts from './Fonts/Fonts';
import SaveNote from './SaveNote';

function EditorUtils({ editor, saveAnnotation, noteTitle, previewTags, savedTags, isEditing, onContentChange, noteId }) {
    return (
        <>
            <div className={styles.utilsContainer}>
                <SaveNote 
                isEditing={isEditing} 
                noteId={noteId} 
                saveAnnotation={saveAnnotation}
                onContentChange={onContentChange} 
                editor={editor} 
                noteTitle={noteTitle}
                previewTags={previewTags}
                savedTags={savedTags}
                />
                <Fonts editor={editor}/>
                <Highlights editor={editor}/>
            </div>
        </>
    )
};

export default EditorUtils;
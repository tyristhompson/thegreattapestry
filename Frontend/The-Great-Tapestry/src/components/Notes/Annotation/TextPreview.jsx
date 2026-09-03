import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import { useEffect } from 'react';

function TextPreview({ initialContent }) {
    const editor = useEditor({
        extensions: [StarterKit, Highlight.configure({ multicolor: true })],
        content: initialContent,
        editable: false,
    }); 

    useEffect(() => {
        if(!editor) return;

        editor.commands.setContent(initialContent, {
            emitUpdate: false
        });
    }, [editor, initialContent])


    return (
        <>
        <EditorContent editor={editor} />
        </>
    )
};

export default TextPreview;
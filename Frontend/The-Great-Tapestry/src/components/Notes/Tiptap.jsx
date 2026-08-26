import { useEditor, EditorContent, useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';

function Tiptap() {
    const editor = useEditor({
        extensions: [StarterKit, Highlight.configure({ multicolor: true })], // define your extension array
        content: '<p>Hello World!</p>', // initial content
    });

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

    if (!editor) {
        return null
    };

    return (
        <>
            <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>

            <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()}
                className={editorState.isOrange ? 'is-active' : ''}
            >
                Orange
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()}
                className={editorState.isGreen ? 'is-active' : ''}
            >
                Green
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()}
                className={editorState.isBlue ? 'is-active' : ''}
            >
                Blue
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#b197fc' }).run()}
                className={editorState.isPurple ? 'is-active' : ''}
            >
                Purple
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffa8a8' }).run()}
                className={editorState.isLightRed ? 'is-active' : ''}
            >
                Red (#ffa8a8)
            </button>


            <EditorContent editor={editor} />
            <BubbleMenu editor={editor}>
                <button onClick={() => editor.chain().focus().toggleBold().run()}>
                    Bold
                </button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()}>
                    Italic
                </button>
            </BubbleMenu>
        </>
    )
}

export default Tiptap






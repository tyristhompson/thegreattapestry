import styles from '../Tiptap.module.css';
import { useEditorState } from '@tiptap/react';

function Underline({ editor }) {

    const { isUnderline } = useEditorState({
        editor,
        selector: ctx => ({
            isUnderline: ctx.editor.isActive('underline') ?? false,
        }),
    });


    return (
        <>
            <button onClick={() => {
                editor.chain().focus().toggleUnderline().run();
            }}>
                <svg className={[styles.styleIconUnderline, isUnderline && styles.selected].join(" ")} fill="#000000" width="256px" height="256px" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 27.9883 41.7344 C 36.4492 41.7344 41.6523 36.6719 41.6523 29.3125 L 41.6523 9.2266 C 41.6523 7.9141 40.7852 7.0703 39.4726 7.0703 C 38.1367 7.0703 37.3164 7.9141 37.3164 9.2266 L 37.3164 28.9609 C 37.3164 34.1875 33.8711 37.7266 27.9883 37.7266 C 22.1289 37.7266 18.6836 34.1875 18.6836 28.9609 L 18.6836 9.2266 C 18.6836 7.9141 17.8164 7.0703 16.5039 7.0703 C 15.1680 7.0703 14.3477 7.9141 14.3477 9.2266 L 14.3477 29.3125 C 14.3477 36.6719 19.5742 41.7344 27.9883 41.7344 Z M 15.7305 48.9297 L 40.2461 48.9297 C 41.0195 48.9297 41.6523 48.3438 41.6523 47.5469 C 41.6523 46.7500 41.0195 46.1406 40.2461 46.1406 L 15.7305 46.1406 C 14.9805 46.1406 14.3477 46.7500 14.3477 47.5469 C 14.3477 48.3438 14.9805 48.9297 15.7305 48.9297 Z"></path></g></svg>
            </button>
        </>
    )
};

export default Underline;
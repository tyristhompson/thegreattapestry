import styles from '../Tiptap.module.css';
import Bold from './Bold';
import Italic from './Italic';
import Underline from './Underline';
import BlockQuote from './BlockQuote';

function Fonts({ editor }) {
    
    return (
        <>
            <div className={styles.buttonsContainer}>
                <Bold editor={editor}/>
                <Italic editor={editor} />
                <Underline editor={editor} />
                <BlockQuote editor={editor} />
            </div>
        </>
    )
};

export default Fonts;
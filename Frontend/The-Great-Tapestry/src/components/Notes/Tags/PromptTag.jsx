import { useState } from "react";
import styles from "./Tags.module.css";




function PromptTag({ addTag }) {
    const [input, setInput] = useState("");

    function updateInput(event) {
        const value = event.target.value;
        setInput(value);
    };

    return (
        <>
            <form className={[styles.tag, styles.prompt].join(" ")}>
                <input type="text" value={input} onChange={(event) => { updateInput(event) }} />
                <button onClick={() => addTag(input)}>+</button>
            </form>
        </>
    )
};

export default PromptTag;
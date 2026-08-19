import { useEffect, useState } from "react";
import styles from "./BookInfo.module.css";

function Description(props) {
    const [largeText, setLargeText] = useState(false);
    const [faded, setFaded] = useState(false);
    const [moreText, setMoreText] = useState("...read more");

    useEffect(() => {
        if (props.value?.length > 1020) {
            setLargeText(true)
            setFaded(true)
        }
    }, [])

    function toggleText() {
        if (faded) {
            setFaded(false)
            setMoreText("...read less")
        } else {
            setFaded(true)
            setMoreText("...read more")
        }
    }

    return (
        <>
            {
                largeText ?
                    <>
                        <p className={faded ? styles.fade : styles.plain}>{faded ? props.value?.slice(0, 1020) : props.value}</p>
                        <span onClick={toggleText} className={styles.readMore}>{moreText}</span>
                    </> :
                    <p className={[styles.plain, styles.margin].join(" ")}>{props.value}</p>
            }

        </>
    )
};

export default Description;
import styles from "./Rating.module.css"


function Rating () {
    return (
        <>
        <div>
            <img className={styles.star }src="/images/star.svg" alt="" />
            <img className={styles.star }src="/images/star.svg" alt="" />
            <img className={styles.star }src="/images/star.svg" alt="" />
            <img className={styles.star }src="/images/star.svg" alt="" />
            <img className={styles.star }src="/images/star.svg" alt="" />
        </div>
        </>
    )
};

export default Rating;
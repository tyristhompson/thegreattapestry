import styles from "./Homepage.module.css";

function HomePage() {
    return (
        <>
            <div className={styles.body}>
                <section className={styles.nav}>
                    <header>
                        <h2>The Great Tapestry</h2>
                        <button className={styles.clearButton}><a href="/login">Login</a></button>
                    </header>
                </section>

                <section className={styles.hero}>
                    <h2>Where Art and Literature Intertwine</h2>
                    <p>Create stunning Libraries that weave together <strong>your</strong> story.</p>
                </section>

                <section className={styles.gallery}>
                    <div className={styles.carousel}>
                        <div className={styles.group}>
                            <div className={styles.card}>
                                <img src="./images/call-me-by-your-name.jpg" alt="" />
                            </div>
                            <div className={styles.card}>
                                <img src="./images/How-To-Be-Eaten_design-Julianna-Lee.jpg" alt="" />
                            </div>
                            <div className={styles.card}>
                                <img src="./images/kairos.avif" alt="" />
                            </div>
                            <div className={styles.card}>
                                <img src="./images/mancalledove.jpg" alt="" />
                            </div>
                            <div className={styles.card}>
                                <img src="./images/Song-Of-Achilles.jpg" alt="" />
                            </div>
                            <div className={styles.card}>
                                <img src="./images/The-Fire-Next-Time.jpg" alt="" />
                            </div>
                            <div className={styles.card}>
                                <img src="./images/The-Nursery.avif" alt="" />
                            </div>
                            <div className={styles.card}>
                                <img src="./images/YellowFace.avif" alt="" />
                            </div>
                        </div>
                        <div aria-hidden className={styles.group}>
                            <div className={styles.card}>
                                <img src="./images/call-me-by-your-name.jpg" alt="" />
                            </div>
                            <div className={styles.card}>
                                <img src="./images/How-To-Be-Eaten_design-Julianna-Lee.jpg" alt="" />
                            </div>
                            <div className={styles.card}>
                                <img src="./images/kairos.avif" alt="" />
                            </div>
                            <div className={styles.card}>
                                <img src="./images/mancalledove.jpg" alt="" />
                            </div>
                            <div className={styles.card}>
                                <img src="./images/Song-Of-Achilles.jpg" alt="" />
                            </div>
                            <div className={styles.card}>
                                <img src="./images/The-Fire-Next-Time.jpg" alt="" />
                            </div>
                            <div className={styles.card}>
                                <img src="./images/The-Nursery.avif" alt="" />
                            </div>
                            <div className={styles.card}>
                                <img src="./images/YellowFace.avif" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
};

export default HomePage;
import styles from "./Profile.module.css";
import { useState } from "react";

function Profile(props) {
    const {username} = props.user;
    
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>
                        {username + "'s"} Tapestry
                    </h2>
                    <button className={styles.clearButton}><a href="/search">Search Catalog</a></button>
                </div>     
            </div>
        </>
    )
}

export default Profile;
import styles from "./Profile.module.css";
import { AuthContext } from "../../contexts/authContext";
import { useContext, useEffect } from "react";
import { getUser } from "../Utlities";
import { useNavigate } from "react-router";

function Profile() {
    const navigate = useNavigate();
    const {authUser, setAuthUser} = useContext(AuthContext);

    useEffect(() => {
        if(!authUser) {
            getUser().then((user) => {
                user === false ? navigate("/login") : setAuthUser(user);
                console.log(user);
            });
        }
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>
                        {authUser ? authUser?.username + "'s" : "Placeholder's"} Tapestry
                    </h2>
                    <button className={styles.clearButton}><a href="/search">Search Catalog</a></button>
                </div>
            </div>
        </>
    )
}

export default Profile;
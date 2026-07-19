import styles from "./Login.module.css";
import { useState } from "react";
import { errorMessages } from "../Utlities";
import axios from "axios";
import Form from "./Form";

function Login() {
    const [fetchError, setFetchError] = useState(false);
    const [fetchErrorMessage, setFetchErrorMessage] = useState("")


    async function findUser(username, password) {
        // console.log("sending api request to check user credentials...", username, password);
        try {
            const response = await axios.post("http://localhost:3000/login", {
                username: username,
                password: password
            });

            const user = response.data.user;
            console.log("response from api:", user);

        } catch (error) {
            const responseError = error.response.data.error;
            setFetchError(true);
            if (error.status === 400) {
                setFetchErrorMessage(errorMessages[5]);
            } else {
                setFetchErrorMessage(responseError);

            }
        }
    }


    return (
        <>
            <title>Login</title>
            <div className={styles.body}>
                <img className={styles.profileImg} src="./images/profile-svgrepo-com.svg" alt="" />
                <Form findUser={findUser} type="login" />
                <p className={styles.subText}>Don't have an account? <a href="/register">Register here.</a></p>
                {fetchError && <p className={styles.errorMessage}>{fetchErrorMessage}</p>}
            </div>
        </>
    )
};

export default Login;
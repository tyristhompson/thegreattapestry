import styles from "../Login/Login.module.css";
import { AuthContext } from "../../contexts/authContext";
import { useState, useContext } from "react";
import axios from "axios";
import Form from "../Login/Form";
import { errorMessages } from "../Utlities";

function Register() {
    const [ , setAuthUser] = useContext(AuthContext);
    const [fetchError, setFetchError] = useState(false);
    const [fetchErrorMessage, setFetchErrorMessage] = useState("")

    async function createUser(username, email, password) {
        try {
            const response = await axios.post("http://localhost:3000/register", {
                username: username,
                email: email,
                password: password,
            });

            const user = response.data.user;
            setAuthUser(user);
        } catch (error) {
            const responseError = error.response.data.error;
            setFetchError(true);
            if (error.status === 500) {
                setFetchErrorMessage(errorMessages[5]);
            } else {
                setFetchErrorMessage(responseError);

            }
        }
    }


    return (
        <>
            <title>Register</title>
            <div className={styles.body}>
                <img className={styles.profileImg} src="./images/profile-svgrepo-com.svg" alt="" />
                <Form createUser={createUser} type="register" />
                <p className={styles.subText}>Already have an account? <a href="/login">Login.</a></p>
                {fetchError && <p className={styles.errorMessage}>{fetchErrorMessage}</p>}
            </div>
        </>
    )
};

export default Register;
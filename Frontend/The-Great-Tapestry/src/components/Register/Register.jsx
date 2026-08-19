import styles from "./Register.module.css";
import { AuthContext } from "../../contexts/authContext";
import { useState, useContext } from "react";
import axios from "axios";
import Form from "../Login/Form";
import { errorMessages } from "../Utlities";
import { useNavigate } from "react-router";

function Register() {
    const navigate = useNavigate();
    const { setAuthUser } = useContext(AuthContext);
    const [fetchError, setFetchError] = useState(false);
    const [fetchErrorMessage, setFetchErrorMessage] = useState("")

    async function createUser(username, email, password) {
        try {
            const response = await axios.post("http://localhost:3000/user/register", {
                username: username,
                email: email,
                password: password,
            });

            const user = response.data.user;
            setAuthUser(user);
            navigate("/login");
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
            <div className={styles.container}>
                <div className={styles.flex}>
                    <div className={styles.requirementContainer}>
                        <p>Username must be between 3 to 12 characters</p>
                        <p>Password must be between 9 to 25 characters</p>
                        <p>Password must contain at least one special character (! # @ . ? :)</p>
                    </div>
                    <div className={styles.formContainer}>
                        <img className={styles.profileImg} src="./images/profile-svgrepo-com.svg" alt="" />
                        <Form createUser={createUser} type="register" />
                        <p className={styles.subText}>Already have an account? <a href="/login">Login.</a></p>
                        {fetchError && <p className={styles.errorMessage}>{fetchErrorMessage}</p>}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Register;
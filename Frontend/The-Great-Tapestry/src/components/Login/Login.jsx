import styles from "./Login.module.css";
import { AuthContext } from "../../contexts/authContext";
import { useState, useContext, useEffect } from "react";
import { errorMessages, getUser } from "../Utlities";
import axios from "axios";
import Form from "./Form";
import { useNavigate } from "react-router";

function Login() {
    const navigate = useNavigate();
    const { setAuthUser, setLoggedIn } = useContext(AuthContext);
    const [fetchError, setFetchError] = useState(false);
    const [fetchErrorMessage, setFetchErrorMessage] = useState("");

    useEffect(() => {
        getUser().then((user) => {
            if (user) {
                setAuthUser(user);
                navigate("/profile")
            }
        });
    }, []);


    async function findUser(username, password) {
        try {
            const response = await axios.post("http://localhost:3000/user/login", {
                username: username,
                password: password
            }, {
                withCredentials: true,
            });

            const user = response.data.user;
            setAuthUser(user);
            setLoggedIn(true);
            // console.log(user);

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
                <p className={styles.subText}>{"Don't have an account?"} <a href="/register">Register here.</a></p>
                {fetchError && <p className={styles.errorMessage}>{fetchErrorMessage}</p>}
            </div>
        </>
    )
};

export default Login;
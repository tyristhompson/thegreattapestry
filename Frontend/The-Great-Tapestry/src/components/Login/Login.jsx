import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import axios from "axios";
import Form from "./Form";

function Login() {
    const navigate = useNavigate();


    return (
        <>
            <title>Login</title>
            <div className={styles.body}>
                <img className={styles.profileImg} src="./images/profile-svgrepo-com.svg" alt="" />
                <Form />
            </div>
        </>
    )
};

export default Login;
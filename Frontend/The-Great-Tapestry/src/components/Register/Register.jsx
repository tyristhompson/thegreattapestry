import styles from "../Login/Login.module.css";
import { useNavigate } from "react-router";
import axios from "axios";
import Form from "../Login/Form";

function Register() {
    const navigate = useNavigate();
    
    function createUser(username, email, password) {
        console.log("creating new user...", username, email, password);
    }


    return (
        <>
            <title>Login</title>
            <div className={styles.body}>
                <img className={styles.profileImg} src="./images/profile-svgrepo-com.svg" alt="" />
                <Form createUser={createUser} type="register"/>
                <p className={styles.subText}>Already have an account? <a href="/login">Login.</a></p>
            </div>
        </>
    )
};

export default Register;
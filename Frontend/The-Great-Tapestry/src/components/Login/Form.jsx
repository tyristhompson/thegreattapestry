import { useState } from "react";
import Password from "./Password";
import Username from "./Username";
import Email from "../Register/Email";
import styles from "./Login.module.css";

function Form(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);

    function updateField(name, value, error) {
        error ? setError(true) : setError(false);
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        } else {
            setEmail(value);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const loginForm = props.type === "login";
        const registerForm = props.type === "register";
        const emptyLoginFields = (username === "" || password === "");
        const emptyRegisterFields = (username === "" || password === "" || email === "");

        if (error) {
            console.log("Could not submit form");
        } else if (loginForm && emptyLoginFields) {
            setError(true)
            console.log("Could not submit login form");
        } else if (registerForm && emptyRegisterFields) {
            setError(true)
            console.log("Could not submit register form");
        } else {
            props.type === "login" ?
                props.findUser(username, password) :
                props.createUser(username, email, password);
        }
    }


    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            {
                props.type === "register" &&
                <Email
                    update={updateField}
                    type="text"
                    name="email"
                    placeholder="johndoe@gmail.com"
                />
            }
            <Username
                update={updateField}
                type="text"
                name="username"
                placeholder="ILoveBooks123"
            />

            <Password
                update={updateField}
                type="password"
                name="password"
                placeholder="ArtIsCool101"
            />

            <button className={styles.clearButton} type="submit">{props.type === "login" ? "Login" : "Register"}</button>
        </form>
    )
}

export default Form;
import { useState } from "react";
import Input from "./Input";
import styles from "./Login.module.css";

function Form() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    function updateField(name, value, error) {
        error ? setError(true) : setError(false);
        name === "username" ? 
        setUsername(value) : 
        setPassword(value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(error) {
            console.log("Could not submit form");
        } else if(username === "" || password === ""){
            setError(true)
            console.log("Could not submit form");
        } else {
            console.log(username, password);
        }
    }


    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <Input
                update={updateField}
                type="text"
                name="username"
                placeholder="ILoveBooks123"
            />

            <Input
                update={updateField}
                type="password"
                name="password"
                placeholder="ArtIsCool101"
            />

            <button className={styles.clearButton} type="submit">Login</button>
        </form>
    )
}

export default Form;
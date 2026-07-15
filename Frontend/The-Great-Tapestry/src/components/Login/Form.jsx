import { useState } from "react";
import styles from "./Login.module.css";

function Form() {
    const [inputs, setInputs] = useState({ username: "", password: "" });
    const [error, setError] = useState(false);

    function updateInputs(event) {
        const { name, value } = event.target;
        setInputs((previous) => { return { ...previous, [name]: value } });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const { username } = inputs;
        const bannedChar = ["@", "#", "$", "&", "*", "!", "%", "?", "/", "\\", "'", "\"", "`", "~"]
        const isBanned = bannedChar.find(char => username.includes(char));

        if (!isBanned) {
            setInputs({ username: "", password: "" })
            console.log(username);
        } else {
            setError(true);
        }

    }


    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username"></label>
                <input
                    className={error ? styles.error : ""}
                    onChange={updateInputs}
                    type="text" name="username"
                    placeholder="ILoveBooks123"
                    value={inputs.username}
                />
                {error && <p className={styles.errorMessage}>Please only include allowed special characters.</p>}
            </div>
            <div>
                <label htmlFor="password"></label>
                <input
                    onChange={updateInputs}
                    type="password"
                    name="password"
                    placeholder="ArtIsCool101"
                    value={inputs.password}
                />
            </div>

            <button className={styles.clearButton} type="submit">Login</button>
        </form>
    )
}

export default Form;
import { useState } from "react";
import { bannedChar, errorMessages } from "../Utlities";
import styles from "./Login.module.css";

function Form() {
    const [inputs, setInputs] = useState({ username: "", password: "" });
    const [usernameError, setUsernameError] = useState({ error: false, errorMessage: "" });
    const [passwordError, setPasswordError] = useState({ error: false, errorMessage: "" });

    function updateInputs(event) {
        const { name, value } = event.target;
        setInputs((previous) => { return { ...previous, [name]: value } });
        if(usernameError.error) {
            setUsernameError({error: false, errorMessage: ""});
        } else if (passwordError.error) {
            setPasswordError({error: false, errorMessage: ""});
        }
    }

    function checkErrors(event) {
        event.preventDefault();
        const { username, password } = inputs;
        const validUsernameLength = username.trim().length > 3 && username.trim().length < 12;
        const validPasswordLength = password.trim().length > 9 && password.trim().length < 25;
        const usernameBanned = bannedChar.find(char => username.includes(char)); 
        const passwordBanned = bannedChar.find(char => password.includes(char)); 

        if (validUsernameLength && validPasswordLength) {
            if (!usernameBanned && !passwordBanned) { 
                handleSubmit();
            } else {
                usernameBanned && setUsernameError({ error: true, errorMessage: errorMessages[0] }); 
                passwordBanned && setPasswordError({ error: true, errorMessage: errorMessages[0] }); 
            }
        } else {
            !validUsernameLength && setUsernameError({ error: true, errorMessage: errorMessages[1] });
            !validPasswordLength && setPasswordError({ error: true, errorMessage: errorMessages[3] });
        }
    }

    function handleSubmit() {
        console.log(inputs);
    }



    return (
        <form className={styles.loginForm} onSubmit={checkErrors}>
            <div>
                <label htmlFor="username"></label>
                <input
                    className={usernameError.error ? styles.error : ""}
                    onChange={updateInputs}
                    type="text" name="username"
                    placeholder="ILoveBooks123"
                    value={inputs.username}
                />
                {usernameError.error && <p className={styles.errorMessage}>{usernameError.errorMessage}</p>}
            </div>
            <div>
                <label htmlFor="password"></label>
                <input
                    className={passwordError.error ? styles.error : ""}
                    onChange={updateInputs}
                    type="password"
                    name="password"
                    placeholder="ArtIsCool101"
                    value={inputs.password}
                />
                {passwordError.error && <p className={styles.errorMessage}>{passwordError.errorMessage}</p>}
            </div>

            <button className={styles.clearButton} type="submit">Login</button>
        </form>
    )
}

export default Form;
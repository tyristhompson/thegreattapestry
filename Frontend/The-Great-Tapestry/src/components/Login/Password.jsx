import { useState } from "react";
import { bannedChar, errorMessages } from "../Utlities";
import styles from "./Login.module.css";

function Password(props) {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const errorFound = () => setError(true);
    const noError = () => setError(false);
    const [errorMessage, setErrorMessage] = useState("");


    function updateInput(event) {
        const value = event.target.value;
        setInput(value);
        checkErrors(value);
    }

    function checkErrors(value) {
        const validLength = value.trim().length >= 6 && value.trim().length <= 25;
        const hasBannedChar = bannedChar.find(char => value.includes(char));

        if (validLength) {
            if (!hasBannedChar) {
                noError();
                props.update(props.name, value, false);
            } else {
                setErrorMessage((previous) => { return previous, errorMessages[0] });
                errorFound();
                props.update(props.name, value, true);

            }
        } else {
            setErrorMessage((previous) => { return previous, errorMessages[3] });
            errorFound();
            props.update(props.name, value, true);

        }
    }

    return (
        <>
            <div>
                <label htmlFor={props.name}></label>
                <input
                    className={error ? styles.error : ""}
                    onChange={updateInput}
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={input}
                />
                {error && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
        </>
    )
};

export default Password;
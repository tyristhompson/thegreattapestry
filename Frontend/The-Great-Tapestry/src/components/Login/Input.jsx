import { useState } from "react";
import { bannedChar, errorMessages } from "../Utlities";
import styles from "./Login.module.css";

function Input(props) {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const errorFound = () => setError(true);
    const noError = () => setError(false);
    const [errorMessage, setErrorMessage] = useState("");


    function updateInput(event) {
        const { name, value } = event.target;
        setInput(value);
        checkErrors(name, value);
    }

    function checkErrors(name, value) {
        const username = name === "username";
        const validLength = username ?
            value.trim().length >= 3 && value.trim().length <= 12 :
            value.trim().length >= 9 && value.trim().length <= 25;
        const hasBannedChar = bannedChar.find(char => value.includes(char));

        if (validLength) {
            if (!hasBannedChar) {
                noError();
                props.update(name, value, false);
            } else {
                setErrorMessage((previous) => { return previous, errorMessages[0] });
                errorFound();
                props.update(name, value, true);

            }
        } else {
            username ? 
            setErrorMessage((previous) => { return previous, errorMessages[1] }) : 
            setErrorMessage((previous) => { return previous, errorMessages[3] });
            errorFound();
            props.update(name, value, true);

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

export default Input;

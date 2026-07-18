import { useState } from "react";
import { errorMessages } from "../Utlities";
import styles from "../Login/Login.module.css";

function Email(props) {
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
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const validEmail = pattern.test(value);

        if (validEmail) {
            noError();
            props.update(props.name, value, false);

        } else {
            setErrorMessage((previous) => { return previous, errorMessages[4] });
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

export default Email;
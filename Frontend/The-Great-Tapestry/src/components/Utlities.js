const bannedChar = ["@", "#", "$", "&", "*", "!", "%", "?", "/", "\\", "'", "\"", "`", "~"];
const errorMessages=
 ["Please only include allowed special characters.",
     "Username must be between 3 to 12 characters", 
     "Password must contain at least one number and one special character",
     "Password must be between 9 to 25 characters"
];

 /*function checkErrors(event) {
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
    } */

export {bannedChar, errorMessages};
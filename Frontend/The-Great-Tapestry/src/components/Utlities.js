import axios from "axios";

const bannedChar = ["@", "#", "$", "&", "*", "!", "%", "?", "/", "\\", "'", "\"", "`", "~"];
const errorMessages =
    ["Please only include allowed special characters.",
        "Username must be between 3 to 12 characters",
        "Password must contain at least one number and one special character",
        "Password must be between 9 to 25 characters",
        "Please enter a valid email",
        "Couldn't complete your request. Please try again."
    ];

const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:3000/user/me", {
            withCredentials: true,
        });
        return response.data.user;
    } catch (err) {
        return false;
    }
};


export { bannedChar, errorMessages, getUser };
const bannedChar = ["@", "#", "$", "&", "*", "!", "%", "?", "/", "\\", "'", "\"", "`", "~"];
const errorMessages=
 ["Please only include allowed special characters.",
     "Username must be between 3 to 12 characters", 
     "Password must contain at least one number and one special character",
     "Password must be between 9 to 25 characters"
];

export {bannedChar, errorMessages};
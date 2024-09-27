const usernameValidation = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,12}$/;
    return usernameRegex.test(username);
};
const emailValidation = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@\w+([\w.-]+)*\.\w{2,}$/;
    return emailRegex.test(email);
};
const passwordValidation = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;
    return passwordRegex.test(password);
};
export { usernameValidation, emailValidation, passwordValidation };

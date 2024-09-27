const usernameValidation = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,12}$/;
    return usernameRegex.test(username);
}

const emailValidation = (email: string): boolean => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@\w+([\w.-]+)*\.\w{2,}$/;
    return emailRegex.test(email);
}

const passwordValidation = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;
    return passwordRegex.test(password);
}

export {usernameValidation, emailValidation, passwordValidation};
export const validateName = (value: string): string => {
    if (!value) return "Name is required.";
    if (value.length < 3) return "Name must be at least 3 characters.";
    return "";
};

export const validateEmail = (value: string): string => {
    if (!value) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid.";
    return "";
};

export const validatePassword = (value: string): string => {
    if (!value) return "Password is required.";
    if (value.length < 6) return "Password must be at least 6 characters.";
    if (value.length > 12) return "Password must not exceed 12 characters.";
    if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter.";
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter.";
    if (!/\d/.test(value)) return "Password must contain at least one number.";
    return "";
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    if (!confirmPassword) return "Confirm Password is required.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return "";
};
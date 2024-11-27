export const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[@$!%*#?&]/.test(password)
    return (
        password.length >= minLength &&
        hasLowercase && hasNumber && hasSpecialChar && hasUppercase
    );
}
const validDomains = ["gmail.com", "outlook.com", "yahoo.com"];

export const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) return false;

    const domain = email.split("@")[1];
    return validDomains.includes(domain);
};
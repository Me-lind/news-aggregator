const { body } = require("express-validator");

export const validatePassword = body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must include at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must include at least one lowercase letter.")
    .matches(/\d/)
    .withMessage("Password must include at least one number.")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must include at least one special character.");

    export const validateEmail = body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .matches(/@(gmail|outlook|yahoo)\.com$/)
    .withMessage("Only Gmail, Outlook, and Yahoo emails are allowed.");


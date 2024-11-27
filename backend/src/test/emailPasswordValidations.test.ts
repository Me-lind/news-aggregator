import { validateEmail, validatePassword } from "../validations/emailPasswordValidations";
import { validationResult } from "express-validator";

describe("validatePassword", () => {
    it("validates a strong password", async () => {
        const req = { body: { password: "StrongP@ssword1" } };
        const middleware = validatePassword.run(req);

        await middleware;

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(true); 
    });

    it("rejects a weak password", async () => {
        const req = { body: { password: "weakpass" } };
        const middleware = validatePassword.run(req);

        await middleware;

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false); 
        expect(errors.array()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ msg: "Password must include at least one uppercase letter." }),
            ])
        );
    });
});

describe("validateEmail", () => {
    it("accepts a valid Gmail email", async () => {
        const req = { body: { email: "test@gmail.com" } };
        const middleware = validateEmail.run(req);

        await middleware;

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(true); 
    });

    it("rejects invalid email domains", async () => {
        const req = { body: { email: "test@invalid.com" } };
        const middleware = validateEmail.run(req);

        await middleware;

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false); 
        expect(errors.array()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ msg: "Only Gmail, Outlook, and Yahoo emails are allowed." }),
            ])
        );
    });
});

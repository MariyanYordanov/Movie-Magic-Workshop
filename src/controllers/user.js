const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { createToken } = require("../services/token");
const { register, login } = require("../services/user");
const { isGuest } = require("../middlewares/guards");

const userRouter = Router();

userRouter.get("/register", isGuest, (req, res) => {
    res.render("register", { title: "Register Page" });
});

userRouter.post(
    "/register",
    isGuest,
    body("email")
        .trim()
        .isEmail( { domain_specific_validation: true })
        .withMessage("Enter a valid email address!"),

    body("password")
        .trim()
        .isAlphanumeric()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long!"),

    body('repass')
        .trim()
        .custom((value, { req }) => { return value == req.body.password })
        .withMessage('Passwords do not match!'),

    async (req, res) => {

        const { email, password } = req.body;
        try {
            const result = validationResult(req);

            if(result.errors.length) {

                const err = new Error('Input validation error');
                err.errors = Object.fromEntries(result.errors.map(e => [ e.path, e.msg ]));
                
                throw err;
            }

            const user = await register(email, password);
            const token = createToken(user);

            res.cookie("token", token, { httpOnly: true });

            res.redirect("/");
        } catch (err) {
            console.log(err);
            return res.render("register", {
                title: "Error Register Page",
                errors: err.errors,
                data: { email},
            });
        }
    }
);

userRouter.get("/login", isGuest, (req, res) => {
    res.render("login", { title: "Login Page" });
});

userRouter.post("/login", isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!password || !email) {
            throw new Error("All fields are required!");
        }

        const user = await login(email, password);
        const token = createToken(user);

        res.cookie("token", token, { httpOnly: true });
        res.redirect("/");
    } catch (error) {
        res.render("login", {
            title: "Login Page",
            error: error.message,
            data: { email },
        });
    }

    return;
});

userRouter.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

module.exports = { userRouter };

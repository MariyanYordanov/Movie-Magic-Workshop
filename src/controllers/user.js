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
    async (req, res) => {
        const { email, password, repass } = req.body;

        try {
            if (!password || !email) {
                throw new Error("All fields are required!");
            }

            if (password != repass) {
                throw new Error("Passwords don't match!");
            }

            const user = await register(email, password);
            const token = createToken(user);

            res.cookie("token", token, { httpOnly: true });

            res.redirect("/");
        } catch (err) {
            res.render("register", {
                title: "Register Page",
                error: err.message,
                data: { email },
            });

            return;
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

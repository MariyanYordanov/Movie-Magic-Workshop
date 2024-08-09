const { register, login } = require("../services/user");

module.exports = {
    registerGet: (req, res) => {
        res.render("register", { title: "Register Page" });
    },
    registerPost: async (req, res) => {
        const { email, password, repass } = req.body;
        console.log(email, password, repass);
        try {
            if (!password || !email) {
                throw new Error("All fields are required!");
            }
            if (password != repass) {
                throw new Error("Passwords don't match!");
            }
            await register(email, password);
            res.redirect("/");
        } catch (err) {
            res.render("register", {
                title: "Register Page",
                error: err.message,
                data: { email },
            });
            return;
        }
    },
    loginGet: (req, res) => {
        res.render("login", { title: "Login Page" });
    },
    loginPost: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await login(email, password);
            res.status(200).send(user);
        } catch (error) {
            console.error("Error during user login:", error);
            res.status(400).send(error.message);
        }
    },
};

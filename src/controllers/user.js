module.exports = {
    registerGet: (req, res) => {
        res.render('register', { title: 'Register Page' });
    },
    registerPost: async (req, res) => {
        const { email, password, repass } = req.body;
        console.log(email, password, repass);
        res.redirect('/register');
    },
    loginGet: (req, res) => {
        res.render('login', { title: 'Login Page' });
    },
    loginPost: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await login(email, password);
            res.status(200).send(user);
        } catch (error) {
            console.error('Error during user login:', error);
            res.status(400).send(error.message);
        }
    }
};
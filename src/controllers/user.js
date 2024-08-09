module.exports = {
    registerGet: (req, res) => {
        res.render('register', { title: 'Register Page' });
    },
    registerPost: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await register(email, password);
            res.status(201).send(user);
        } catch (error) {
            console.error('Error during user registration:', error);
            res.status(400).send(error.message);
        }
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
const { User } = require('../models/User');

async function register(username, password) {
    const user = new User({ username, password });
    await user.save();
}

async function login(username, password) {
    const user = await User.findOne({
        username
    });

    if (!user) {
        throw new Error('Invalid username');
    }

    const isMatch = await user.comparePasswords(password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }

    return user;
}

module.exports = {
    register,
    login
};  
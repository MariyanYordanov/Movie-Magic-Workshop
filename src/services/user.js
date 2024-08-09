const { User } = require('../models/User');
const bcr = require('bcryptjs');

async function register(email, password) {
    // check if user exists -> throw error if true
    // hash password
    // create DB record
    // return saved record

    const existing = await User.findOne({ email });
    if (existing) {
        throw new Error('Username is taken');
    }

    const user = new User({
        email,
        password: await bcr.hash(password, 10)
    });

    await user.save();
    return user;
}

async function login(email, password) {
    // check if user exists -> throw error if false
    // compare hashed passwords -> throw error if false
    // return matched user
    
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email');
    }

    const match = await bcr.compare(password, user.password);
    if (!match) {
        throw new Error('Invalid password');
    }

    return user;
}

module.exports = {
    register,
    login
};  
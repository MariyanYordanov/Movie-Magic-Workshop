const bct = require('bcrypt');
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bct.hash(this.password, 10);
    }
    next();
});

const User = model('User', UserSchema);

module.exports = { User };
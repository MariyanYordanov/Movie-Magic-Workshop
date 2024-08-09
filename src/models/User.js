const bct = require('bcryptjs');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        email: { 
            type: String, required: true, unique: true 
        },
        password: { 
            type: String, required: true 
        },
    },
    {
        collation: {
            locale: 'en_US',
            strength: 1,
        },
        timestamps: true,
    }
);

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bct.hash(this.password, 10);
    }
    next();
});

const User = model('User', userSchema);

module.exports = { User };
const jwt = require('jsonwebtoken');

const secret = 'jwt secret';

function createToken(data) {
    const payload = {
        _id: data._id,
        email: data.email
    };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
}

function verifyToken(token) {
    const result = jwt.verify(token, secret);
    return result;
}

module.exports = {
    createToken,
    verifyToken
};
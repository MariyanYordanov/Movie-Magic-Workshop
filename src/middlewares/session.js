const { verifyToken } = require('../services/token');

async function session(req, res, next) {
    const jwt = req.cookies.token;

    try {
        const data = verifyToken(jwt);
        req.user = data;
    } catch (err) {
        res.clearCookie('token');
    }

    next();
}

module.exports = { session };

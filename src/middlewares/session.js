const { verifyToken } = require('../services/token');

async function session(req, res, next) {
    res.locals.hasUser = false;
    const jwt = req.cookies.token;

    try {
        const data = verifyToken(jwt);
        req.user = data;
        res.locals.hasUser = true;
    } catch (err) {
        res.clearCookie('token');
    }

    next();
}

module.exports = { session };
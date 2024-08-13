
function isGuest(req, res, next) {
    if (req.user) {
        return res.redirect('/');
    }
    next();
}

function isUser(req, res, next) {
    if (!req.user) {
        return res.redirect('/login');
    }
    next();
}   

module.exports = {
    isGuest,
    isUser
};  
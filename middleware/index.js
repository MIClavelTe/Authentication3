function loggedOut (req, res, next) {
    if (req.session && req.session.userId) {
        return res.redirect('/profile');
    }
    return next();
}

function requireLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var error = new Error('You are not Authorized');
        error.status = 401;
        return next(error);
    }
}

module.exports.loggedOut = loggedOut;
module.exports.requireLogin = requireLogin; 
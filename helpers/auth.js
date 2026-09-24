module.exports.checkAuth = function(req, res, next) {
    if (!req.session.userid) {
        res.redirect('/login');
    }

    next();
};
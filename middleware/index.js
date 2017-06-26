
var middlewareObj = {};

middlewareObj.usernameFormat = function(req, res, next){
    req.body.username = req.body.username.trim().toLowerCase();
    req.body.username = req.body.username.charAt(0).toUpperCase() + req.body.username.slice(1);
    next();
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be Logged In to do that");
    res.redirect("/login");
};

middlewareObj.isAdmin = function(req, res, next){
    if(req.isAuthenticated() && req.user.isAdmin){
        return next();
    }
    req.flash("error", "You need to be an Admin to do that");
    res.redirect("back");
};
module.exports = middlewareObj;
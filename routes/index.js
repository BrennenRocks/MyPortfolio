var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User     = require("../models/user"),
    middleware = require("../middleware"),
    Project    = require("../models/project");
    
//Root Route
router.get("/", function(req, res){
    Project.find({}, function(err, projects){
        if(err){
            console.log(err);
        }else{
            res.render("landing", {projects: projects, page: "landing"});
        }
    });
});

router.get("/register", function(req, res){
    res.render("register", {page: "register"});
});

//Sign Up Logic
router.post("/register", middleware.usernameFormat, function(req, res){
    var newUser = new User({username: req.body.username});
    if(req.body.password === req.body.confirmPassword){
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                console.log(err);
                req.flash("error", err.message);
                return res.redirect("/register");
            }
            
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to Brennen Programs, " + user.username);
                res.redirect("/");
            });
        });
    }else{
        req.flash("error", "Confirm your password again");
        res.redirect("back");
    }
});

router.get("/login", function(req, res){
    res.render("login", {page: "login"});
});

//Login Logic
router.post("/login", middleware.usernameFormat, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res) {
});

//Logout Route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully logged out");
    res.redirect("/");
});

module.exports = router;
var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    //Models
    User           = require("./models/user");
    
//Require Routes
var indexRoutes = require("./routes/index"),
    projectRoutes = require("./routes/projects");

//Connect to Database
var dbUrl = process.env.DATABASEURL || "mongodb://localhost/brennen_portfolio";
mongoose.connect(dbUrl);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Passport Config
app.use(require("express-session")({
    secret: "I love my wife, Rachel",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Variables for Templates
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    
    next();
});

app.use(indexRoutes);
app.use( "/projects", projectRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Brennen's Portfolio server is running");
});




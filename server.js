var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var User = require('./models/user');

//CONFIG
require('./config/passport')(passport);
mongoose.connect('mongodb://localhost/pitaku');

app.set('views', 'views'); // specify the views directory
app.set('view engine', 'ejs'); // register the template engine
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({secret: 'pitaku',
    saveUninitialized: true,
    resave: true}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions





app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email','public_profile']}));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/saveData',
        failureRedirect: '/' }));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));
app.get('/auth/google/return',
    passport.authenticate('google', { successRedirect: '/saveData',
        failureRedirect: '/' }));



//API//


app.get('/saveData',isLoggedIn, function(req, res){
    res.render('savedata', { user: req.user });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}


//PAGINA//
app.get('/*', function (req, res) {
    res.render('index');
});

app.listen(80,function(){
    console.log("corriendo el server");
});
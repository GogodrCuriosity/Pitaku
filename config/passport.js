var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var User = require('../models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new FacebookStrategy({
            clientID: '1558267654501408',
            clientSecret: '0675ffcbdc95b040b14876f7d0c0a76e',
            callbackURL: "http://pitaku.com/auth/facebook/callback",
            profileFields: ['id', 'emails', 'name']
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function(){
                User.findOne({'facebook.id': profile.id}, function(err, user){
                    if(err){
                        console.log("error");
                        return done(err);
                    }else{
                        if(user) {
                            console.log("encontro", user);
                            return done(null, user);
                        }
                        else {
                            var newUser = new User();
                            newUser.facebook.id = profile.id;
                            newUser.facebook.token = accessToken;
                            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                            newUser.facebook.email = profile.emails[0].value;


                            console.log("nuevo");
                            newUser.save(function(err){
                                if(err){
                                    throw err;
                                }
                                console.log("nuevo",newUser);
                                return done(null, newUser);
                            })
                        }
                    }

                });
            });
        }
    ));
    passport.use(new GoogleStrategy({
            clientID: '679267526561-pjn120hkvo1ssoeqhkfra8h05pb9nqp6.apps.googleusercontent.com',
            clientSecret: 'QHUpJRuf4Hby4I8aBS8MQDCn',
            callbackURL: "http://pitaku.com/auth/google/return"
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function(){
                console.log(profile);
                User.findOne({'google.id': profile.id}, function(err, user){
                    if(err)
                        return done(err);
                    if(user)
                        return done(null, user);
                    else {
                        var newUser = new User();
                        newUser.google.id = profile.id;
                        newUser.google.token = accessToken;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = profile.emails[0].value;

                        newUser.save(function(err){
                            if(err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }

    ));

};
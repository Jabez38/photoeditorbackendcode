// app.js
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const router = express.Router();

// Set up session
router.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Initialize passport
router.use(passport.initialize());
router.use(passport.session());

// Replace 'your-google-client-id' and 'your-google-client-secret' with your Google API credentials
passport.use(new GoogleStrategy({
    clientID: 'your-google-client-id',
    clientSecret: 'your-google-client-secret',
    callbackURL: 'http://localhost:4000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// Replace 'your-facebook-app-id' and 'your-facebook-app-secret' with your Facebook API credentials
passport.use(new FacebookStrategy({
    clientID: 'your-facebook-app-id',
    clientSecret: 'your-facebook-app-secret',
    callbackURL: 'http://localhost:4000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Routes
router.get('/', (req, res) => {
    res.send('Home page');
});




// Google authentication route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    }
);

// Facebook authentication route
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook callback route
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    }
);






// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Protected route
router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Hello, ${req.user.displayName}!`);
    } else {
        res.redirect('/');
    }
});



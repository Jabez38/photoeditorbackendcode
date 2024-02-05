const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: String, // Google ID for Google authentication
    facebookId: String, // Facebook ID for Facebook authentication
    displayName: String,
    email: String,
});

module.exports = mongoose.model('User', userSchema, "User");
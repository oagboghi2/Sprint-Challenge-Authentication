const mongoose = require('mongoose'); // import dependency
const bcrypt = require('bcrypt'); // import bcrypt
const Schema = mongoose.Schema; // creates schema in mongoose

const SALT_ROUNDS = 11; // Salt needed to encrypt password

const UserSchema = Schema({ //create our user schema here
    username: {
        type: String, //username is a string
        required: true, // this property is required
        unique: true, // this property is unique. It can't be repeated
        lowercase: true // This property converts string to be lowercase
    },
    password: {
        type: String, //password is a string
        required: true // this property is required
    }
});

UserSchema.pre('save', function(next) { //UserSchema is a reference to our Schema object we created above
    bcrypt // call the bcrypt method
        .hash(this.password, 10) // hash password with 10 salt. this.password is the password in the userschema object
        .then(hash => { 
            this.password = hash; // make a promise with the hash and return the hash if it passes
            return next();
        })
        .catch(err => {
            return next(err); //return an error
        })
    })

UserSchema.methods.checkPassword = function(plainTextPW, callBack) {
    // we compare our plainTextPW(that we pass into a form) with the this.password
    bcrypt.compare(plainTextPW, this.password, (err, res) => {
        // if it passes, we return a callback with a response object compaiting out password
    })
}

module.exports = mongoose.model('User', UserSchema)
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 11;

const UserSchema = Schema({
  // create your user schema here.
  // username: required, unique and lowercase
  // password: required
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function (next) {
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // Fill this middleware in with the Proper password encrypting, bcrypt.hash()
  // if there is an error here you'll need to handle it by calling next(err);
  // Once the password is encrypted, call next() so that your userController and create a user
  bcrypt
    .hash(this.password, 10) // hash password in salt
    .then(hash => {
      this.password = hash; // make hash password

      return next(); // next() ends the middleware and moves onto to the next one
    })
    .catch(err => {
      return next(err); // return an error
    })
});

UserSchema.methods.checkPassword = function (plainTextPW, callBack) {
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // Fill this method in with the Proper password comparing, bcrypt.compare()
  // Your controller will be responsible for sending the information here for password comparison
  // Once you have the user, you'll need to pass the encrypted pw and the plaintext pw to the compare function
  bcrypt.compare(plainTextPW, this.password, (err, res) => {
    // compare plainTextPW with hash password
    return callBack(err, res) //return the response object with my hashed password
  })
};


module.exports = mongoose.model('User', UserSchema);

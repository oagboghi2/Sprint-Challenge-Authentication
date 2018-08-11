const User = require('../models/userModels'); // Import the schema as a object instance called user

const createUser = (req, res) => {
  const { username, password } = req.body; // creates a body property in the request object
  // create user takes in the username and password and saves a user.
  // our pre save hook should kick in here saving this user to the DB with an encrypted password.
  User.create(req.body) // with the User instance, call the create method with the req.body
    .then(({username, password}) => { 
      res.status(201).json({ username, password }) 
    }) // create a promise and return a response object with your username, password in it
};

module.exports = { createUser }; // export createUser function to other files in project

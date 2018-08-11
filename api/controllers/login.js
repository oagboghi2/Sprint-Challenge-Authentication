const jwt = require('jsonwebtoken'); // import jsonweb token
const { mysecret } = require('../../config'); // create a object with secret passphrase that we import from config file
const User = require('../models/userModels'); // import userschema from model and call it user

const login = (req, res) => {
  const { username, password } = req.body; // create a body property in request object
  User.findOne({username }, (err, user) => { // findOne is a method we use to find a property in user models. 
    if(err){ // if findOne returns an error
      res.status(403).json({ error: "Invalid Username/Password" })
      return;
    }
    if (user === null){ // if user returns null
      res.status(422).json({ error: 'No user witht hat username in our DB '});
      return;
    }
    user.checkPassword(password, (nonMatch, hashMatch) => {
      console.log(hashMatch)

      // this is an example of using our User.method from our model.
      if(nonMatch){
        res.status(500).json({ error: 'bcrypt error' });
        return;
      }
      if (hashMatch) {
        const payload = {username: user.username};
        const token = jwt.sign(payload, mysecret); // creates our JWT with a secret and a payload and a hash.
        res.json({ token }); // sends the token back to the client
      }
    });
  });
};

module.exports = { login };

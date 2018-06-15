<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.
-Middleware is a function that runs after a request is made but before a response come back.
-sessions can be used to store data across requests
-bcrypt is a way to hash passwords
-Json web tokens s we save client-side data

2.  What does bcrypt do in order to prevent attacks?
-It calls a hash function that loops multiple times, hashing the password each time.

3.  What are the three parts of the JSON Web Token?
- The header: storing the type of encode
- Payload: includes the user's data
- Signature: the hash which is the result of the header, payload and the encode
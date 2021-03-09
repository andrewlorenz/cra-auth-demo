const express = require('express');
const auth = require('./auth');
const tokens = require('./tokens');

const port = process.env.PORT || 3001
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// LOGIN USER
app.post('/user/login', (req, res) => {
  console.log('request hit the /user/login endpoint', req.body);
  // at this point we should validate the user - user/password is in req.body
  // but for now we'll just log them in as a fixed user
  const token = tokens.generate('00001');
  res.status(200).json({
    success: true,
    token,
    userDetails: {
      name  : 'Tester',
      email : 'test@test.com',
    }
  });
});

// LOGOUT USER
app.get('/user/logout', (req, res) => {  
  console.log('request hit the /user/logout endpoint');
  const token = req.headers['x-access-token'];
  tokens.remove(token);
  // always report success to the client, even if the server fails!
  res.json({
    success: true,
  });
});

// CHECK USER STATUS (LOGGED IN OR OUT)
app.get('/user/status', (req, res) => {
  console.log('request hit the /user/status endpoint');
  const token = req.headers['x-access-token'];
  const validUser = tokens.lookup(token);
  res.json({
    success: true,
    validUser,
  });
});

// note the "auth" middleware here, which ensures the route checks the user/token first

app.get('/api/test', auth, (req, res) => {
  console.log('I am here at /api/test');
  res.json({
    hello: "THIS IS THE SERVER TEST ENDPOINT",
    user: req.user,
  });
});

app.listen(port, () => {
  console.log('CRA server running on port', port);
});

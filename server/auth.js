const tokens = require('./tokens');

const auth = (req, res, next) => {

  console.log('auth middleware checking');
  const token = req.headers['x-access-token'];
  const validUser = tokens.lookup(token);
  if (validUser) {
    // you can always attach the user object/data to the request object here
    // - it is then available to subsequent routes
    req.user = validUser;
    next();
    return;
  }
  res.status(403).json({
    success: false,
    error: 'you bad person',
  });
};

module.exports = auth;

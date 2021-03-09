// we'll store all the tokens we issue in a "tokenStore", though this will be lost if we restart the server
// the tokens would have to be stored in the database if needed

const tokenStore = {};   // { token : userid }

function generate(userid) {
  var now = new Date().getTime();
  var random = Math.floor(Math.random() * 100000);
  const token = "token_" + userid + "_" + now + "_" + random;
  tokenStore[token] = userid;
  return token;
}

function lookup(token) {
  const lookup = tokenStore[token];
  if (!lookup) return null;
  const [ tokenPrefix, tokenUserid, tokenTime, tokenRandom ] = token.split('_');
  if (lookup === tokenUserid) return tokenUserid;
  return null;  // the token is valid, but its not registered to the user that presented it!
}

function remove(token) {
  delete tokenStore[token];
}

module.exports = {
  generate,
  lookup,
  remove,
}

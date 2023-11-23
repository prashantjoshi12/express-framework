const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if(token){
    isLoggedIn = true
  }
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  console.log(token);

  jwt.verify(token.replace('Bearer ', ''), 'your-secret-key', (err, decoded) => {
    console.log('Decoded User:', decoded);
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: 'Token expired' });
      } else {
        return res.status(403).json({ message: 'Invalid token' });
      }
    }
    req.user = decoded;
    next();
  });
  
}

module.exports = authenticateToken;

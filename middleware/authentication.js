const {authenticateToken} = require('./authenticateToken.js')
module.exports = {
    isLoggedIn: (req, res, next) => {
      console.log(authenticateToken);
      if (req.authenticateToken) {
        return next();
      }
      return res.status(401).json({ message: 'Unauthorized' });
    },
  };
  
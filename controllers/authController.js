const passport = require('passport');
const { generateToken } = require('../config/passport');

module.exports = {
  login: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      const token = generateToken(user);

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json({ message: 'Login successful', user, token });
      });
    })(req, res, next);
  },

  logout: (req, res) => {
    req.logout();
    res.json({ message: 'Logout successful' });
  },
};

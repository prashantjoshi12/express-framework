
module.exports = {
    isLoggedIn: (req, res, next) => {
      console.log(req.isAuthenticated());
      if (req.isAuthenticated()) {
        return next();
      }
      return res.status(401).json({ message: 'Unauthorized' });
    },
  };
  
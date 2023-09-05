module.exports = {
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
     
      res.render('home',{user: req.user});
    }
  };
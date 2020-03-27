module.exports = (req, res, next) => {
  if (!req.user) {
    // checking if a user is logged in or not
    return res.send('Not authorized').status(400);
  }

  next();
};

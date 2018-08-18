var express = require('express');
var router = express.Router();

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

// GET /register
router.get('/register', function(req, res, next) {
  return res.render('register');
});

// POST /register
router.post('/register', function(req, res, next) {
  if (req.body.name &&
  req.body.email &&
  req.body.personality &&
  req.body.password &&
  req.body.confirmPassword ) {
    if (req.body.password !== req.body.confirmPassword) {
      var err = new Error("Passwords don't Match");
      err.status = 400;
      return next(err);
    }
  } else {
    var err = new Error('All Fields Required');
    err.status = 400;
    return next(err);
  }
});

module.exports = router;

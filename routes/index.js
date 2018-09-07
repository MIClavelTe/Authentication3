var express = require('express');
var router = express.Router();
var User = require('../models/users');
var mid = require('../middleware');

// GET /register
router.get('/register', mid.loggedOut, function(req, res, next) {
  return res.render('register', { title: 'Sign Up' });
});

// POST /register
router.post('/register', function(req, res, next) {
  if (req.body.email &&
    req.body.name &&
    req.body.bio &&
    req.body.password &&
    req.body.confirmPassword) {

      if (req.body.password !== req.body.confirmPassword) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }

      var userData = {
        email: req.body.email,
        name: req.body.name,
        bio: req.body.bio,
        password: req.body.password
      };

      User.create(userData, function (error, user) {
        if (error) {
          var err = new Error('Email is in Use');
          err.status = 400;
          return next(err);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });
      
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
})

router.get('/login', mid.loggedOut, function(req, res, next) {
  return res.render('login', { title: 'Log In' });
});

router.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        var err = new Error('Wrong Email or Password');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
      var err = new Error('Email and Password Required');
      err.status = 400;
      next(err);
  }
});

router.get('/logout', function(req, res, next) {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

router.get('/profile', mid.requireLogin, function(req, res, next) {
  User.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(err);
      } else {
        return res.render('profile', { title: 'Profile', name: user.name, bio: user.bio });
      }
    })
});

router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
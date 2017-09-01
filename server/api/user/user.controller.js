const mongoose = require('mongoose');
const express = require("express");
const authController = express.Router();
const passport = require("passport");
const upload = require('../../config/multer');
const User = require("./user.model");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

exports.editUser = function(req, res, next) {

  var _id = req.params.id;
  var name = req.body.name;
  var email = req.body.email;

  const update = {
    name,
    email
  };

  if (req.file) update.picPath = `/uploads/${req.file.filename}`;

  User.findByIdAndUpdate(_id, update, function(err, user) {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: 'something went wrong :('
      });
    }
    res.status(200).json(req.user);
  });
};

exports.createUser = function(req, res, next) {
  console.log(req.file);
  var username = req.body.username;
  var password = req.body.password;
  var name = req.body.name;
  var email = req.body.email;

  if (!username || !password) {
    res.status(400).json({
      message: "Provide username and password"
    });
    return;
  }

  User.findOne({
    username
  }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({
        message: "The username already exists"
      });
      return;
    }

    var salt = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      username,
      password: hashPass,
      name,
      email
    });

    if (req.file) newUser.picPath = `/uploads/${req.file.filename}`;
    newUser.save((err) => {
      if (err) {
        res.status(400).json({
          message: "Something went wrong"
        });
      } else {
        req.login(newUser, function(err) {
          if (err) {
            return res.status(500).json({
              message: 'something went wrong :('
            });
          }
          res.status(200).json(req.user);
        });
      }
    });
  });
};

exports.logInUser = function(req, res, next) {
  console.log(req.body);

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json(info);
    }

    req.login(user, function(err) {
      if (err) {
        return res.status(500).json({
          message: 'something went wrong :('
        });
      }
      res.status(200).json(req.user);
    });
  })(req, res, next);
};

exports.getUserProfile = function(req, res, next) {
  User.findById(req.params.id)
    .then(userDetail => {
      res.json(userDetail);
    })
    .reject(err => {
      res.status(500).json(err);
    });
};

exports.logoutUser = function(req, res, next) {
  req.logout();
  res.status(200).json({
    message: 'Success'
  });
};

exports.loggedInUser = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(403).json({
      message: 'Unauthorized'
    });
  }
};

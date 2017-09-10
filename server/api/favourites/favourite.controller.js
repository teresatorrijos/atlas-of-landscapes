var express = require('express');
const User = require('../user/user.model');
const Landscape = require('../landscape/landscape.model');
const Favourite = require('./favourite.model');


module.exports = {

  new: (req, res, next) => {
    const newFavourite = new Favourite({
      userId: req.body.userId,
      landscapeId: req.body.landscapeId,
    });
    console.log(newFavourite);
    newFavourite.save().then(newFavourite => {
        res.status(201).json({
          message: 'New favourite created!',
          id: newFavourite._id
        });
      })
      .catch(e => res.json(e));
  },

  list: (req, res) => {
    Favourite.find({ landscapeId: req.params.landscapeId })
      .populate('userId').exec()
      .then( users => {
        res.json(users);
      }).catch( errore => res.json(errore));
  }
};

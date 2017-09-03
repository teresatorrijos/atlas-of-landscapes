var express = require('express');
const User = require('../user/user.model');
const Landscape = require('../landscape/landscape.model');
const upload = require('../../config/multer');

module.exports = {

  index: (req, res, next) => {
    Landscape.find({}).then(landscapes => {
        res.json(landscapes);
      })
      .catch(e => res.json(e));
  },

  new: (req, res, next) => {
    console.log('resolving types');
    console.log(req.body);
    const landscape = new Landscape({
      pdescription: req.body.pdescription || '',
      locateDegree: req.body.locateDegree || '',
      localizacion: JSON.parse(req.body.localizacion) || [],
      creatorId: req.user._id || '',
      tags: JSON.parse(req.body.tags) || [],
      picPath: `/uploads/${req.file.filename}` || '',
    });
    console.log(landscape);
    landscape.save().then(landscape => {
        res.status(201).json({
          message: 'New landscape created!',
          id: landscape._id
        });
      })
      .catch(e => res.json(e));
  },

  get: (req, res, next) => {
    Landscape.findById(req.params.id).then(landscape => {
        res.json(landscape);
      })
      .catch(e => res.json(e));
  },

  edit: (req, res, next) => {
    const updates = {
      pdescription: req.body.pdescription,
    };
    Landscape.findByIdAndUpdate(req.params.id, updates).then(landscape => {
        res.json(landscape);
      })
      .catch(e => res.json(e));
  },

  delete: (req, res, next) => {
    Landscape.remove({
        _id: req.params.id
      }).then(() => {
        res.json({
          message: "Landscape removed"
        });
      })
      .catch(e => res.json(e));
  }

};

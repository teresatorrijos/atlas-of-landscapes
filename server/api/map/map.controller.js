var express = require('express');
const Maps = require('./map.model');


module.exports = {

  list: (req, res) => {
    Maps.find({ })
      .exec()
      .then(maps => {
        res.json(maps);
      }).catch( error => res.json(error));
  }
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mapsSchema = new Schema({
  index: { type: String },
  title: { type: String },
  description: { type: String },
  wmsURL: { type: String },
  layer: { type: String },
  legendURL: { type: String },
  zoom: { type: Number }
});

const Maps = mongoose.model('Maps', mapsSchema);
module.exports = Maps;

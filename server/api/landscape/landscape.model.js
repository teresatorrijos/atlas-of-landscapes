const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../user/user.model');

const landscapeSchema = new Schema({
  pdescription: {type:String},
  creatorId: {
     type: Schema.Types.ObjectId,
     ref: 'User'
   },
  localizacion: {
     type: Array,
     default: []
   },
   locateDegree: { type: String},
  picPath: { type: String},
  tags: {
     type: Array,
     default: []
   }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const Landscape = mongoose.model('Landscape', landscapeSchema);
module.exports = Landscape;

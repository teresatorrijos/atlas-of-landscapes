const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Landscape = require('../landscape/landscape.model');
const User = require('../user/user.model');

const favouriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  landscapeId: { type: Schema.Types.ObjectId, ref: 'Landscape' }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Favourite = mongoose.model('Favourite', favouriteSchema);
module.exports = Favourite;

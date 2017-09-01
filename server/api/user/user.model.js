
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  picPath     : { type: String, default: "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

// userSchema.set('toJSON', { virtuals: true });
// userSchema.virtual('imageURL').get(function() {
//   if(this.picPath.includes('http')){
//     return this.picPath;
//   }
// return `${process.env.HOST}${this.pic_path}`;
// });

const User = mongoose.model("User", userSchema);
module.exports = User;

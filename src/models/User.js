const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: String,
  first_name: String,
  last_name: String,
  username: String,
  ads: [{
    type: Schema.Types.ObjectId,
    ref: "Ad"
  }]
}, { _id: false});

const User = mongoose.model('User', UserSchema);

module.exports = User;

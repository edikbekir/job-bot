const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: String,
  first_name: String,
  last_name: String,
  username: String,
  limit: Number,
  balance: String,
  ads: [{
    type: Schema.Types.ObjectId,
    ref: "Ad"
  }],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: "Order"
  }]
}, { _id: false});

const User = mongoose.model('User', UserSchema);

module.exports = User;

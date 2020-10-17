const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: String
}, { _id: false});

const User = mongoose.model('User', UserSchema);

module.exports = User;

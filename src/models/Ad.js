const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdSchema = new Schema({
  category: String,
  contact: String,
  description: String,
  employmentType: String,
  header: String,
  location: String,
  salary: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Ad = mongoose.model('Ad', AdSchema);

module.exports = Ad;

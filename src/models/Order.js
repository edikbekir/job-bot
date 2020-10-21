const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  amount: String,
  currency: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;

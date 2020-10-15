const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  customerID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  customerName: {
    type: String,
    tolowercase: true,
    trim: true,
    required: true,
  },
  customerDepartment: {
    type: String,
    tolowercase: true,
    trim: true,
    required: true,
  },
  order: {
    type: Array,
    required: true,
  },
});

const Order = model('Order', orderSchema);
module.exports = Order;

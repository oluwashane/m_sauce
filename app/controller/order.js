/* eslint-disable no-underscore-dangle */
const Order = require('../model/order');

const placeOrder = async (req, res) => {
  console.log(req);
  const order = new Order({
    ...req.body,
    customerID: req.user._id,
    customerName: req.user.name,
    customerDepartment: req.user.department,
  });
  try {
    await order.save();
    res.status(200).send(order);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.find({});
    res.status(200).send(order);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getItemOrdered = async (req, res) => {
  try {
    await req.user.populate('orders').execPopulate();
    res.status(200).send({
      message: 'madam sauce kitchen',
      order: req.user.orders,
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  placeOrder,
  getOrder,
  getItemOrdered,
};

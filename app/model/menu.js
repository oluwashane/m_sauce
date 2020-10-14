const { Schema, model } = require('mongoose');

const menuSchema = new Schema({
  day: {
    type: String,
    tolowercase: true,
    required: true,
  },
  menu: [{
    name: {
      type: String,
      tolowercase: true,
      required: true,
    },
    image: {
      type: String,
      tolowercase: true,
      default: '/image/test/url',
    },
  }],
}, { timestamps: true });

const Menu = model('Menu', menuSchema);
module.exports = Menu;

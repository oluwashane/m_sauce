/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  name: String,
  department: String,
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    min: 7,
    required: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
}, { timestamps: true });

userSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'customerID',
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

// eslint-disable-next-line func-names
userSchema.methods.generateToken = async function () {
  const user = this;

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

userSchema.statics.validateCredentials = async (username, password) => {
  // eslint-disable-next-line no-use-before-define
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = model('User', userSchema);
module.exports = User;

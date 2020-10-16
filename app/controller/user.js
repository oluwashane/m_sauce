const User = require('../model/user');

const register = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.validateCredentials(username, password);
    const token = await user.generateToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { user } = req;
    user.tokens = user.tokens.filter((token) => (token.token !== req.token));
    await req.user.save();
    res.status(200).send('sign out successful');
  } catch (error) {
    res.status(500).send(error);
  }
};

const profile = (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  profile,
};

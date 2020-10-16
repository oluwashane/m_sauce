const Menu = require('../model/menu');
const currentDay = require('../helper/day');
const displayMenu = require('../helper/displayMenu');

const addMenu = async (req, res) => {
  const menu = new Menu(req.body);
  try {
    await menu.save();
    res.status(201).send(menu);
  } catch (err) {
    res.sendStatus(400);
  }
};

const getMenu = async (req, res) => {
  try {
    const fetchMenus = await Menu.find({});
    const menu = displayMenu(fetchMenus, currentDay());
    res.status(200).send(menu);
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};

// eslint-disable-next-line consistent-return
const editMenu = async (req, res) => {
  const acceptableUpdate = ['menu'];
  const updates = Object.keys(req.body);
  const isValid = updates.every((update) => update.includes(acceptableUpdate));
  const menuId = req.params.id;
  const menu = await Menu.findById(menuId);
  if (!isValid) {
    return res.status(400).send({ Error: 'Invalid Update' });
  }

  try {
    updates.forEach((item) => {
      menu[item] = req.body[item];
    });
    await menu.save();
    res.status(200).send(menu);
  } catch (e) {
    res.status(500).send(e);
  }
};

const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    res.status(200).send(menu);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  addMenu,
  getMenu,
  editMenu,
  deleteMenu,
};

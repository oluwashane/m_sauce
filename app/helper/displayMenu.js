const { ErrorHandler } = require('./error');

const displayMenu = (arr, currentday) => {
  const menuList = arr.filter((menu) => currentday === menu.day);
  if (menuList && menuList.length <= 0) {
    throw new ErrorHandler(503, 'Have a great week :)');
  }

  return menuList;
};

module.exports = displayMenu;

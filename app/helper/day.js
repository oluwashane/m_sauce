const getCurrentDay = () => {
  const dateNow = new Date();
  const option = { weekday: 'long' };
  const day = new Intl.DateTimeFormat('en-US', option).format(dateNow);
  return day.toLowerCase();
};

module.exports = getCurrentDay;

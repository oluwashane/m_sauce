const express = require('express');
require('../db/mongoose');
const cors = require('cors');
const morgan = require('morgan');
const { ErrorHandler, handleError } = require('./helper/error');
const menuRoute = require('./router/menu');
const userRoute = require('./router/user');
const orderRoute = require('./router/order');

const { PORT } = process.env;

const app = express();

console.log(process.env.URL);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1/', menuRoute);
app.use('/api/v1/', userRoute);
app.use('/api/v1/', orderRoute);

// error handler
app.use((req, res, next) => {
  const error = new ErrorHandler(404, 'Page Not Found');
  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

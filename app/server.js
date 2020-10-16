const express = require('express');
require('../db/mongoose');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const { ErrorHandler, handleError } = require('./helper/error');
const menuRoute = require('./router/menu');
const userRoute = require('./router/user');
const orderRoute = require('./router/order');
const swaggerDocument = require('../docs/swagger.json');

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1/', menuRoute);
app.use('/api/v1/', userRoute);
app.use('/api/v1/', orderRoute);
app.use('/api/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
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

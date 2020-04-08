const express = require('express');
const createError = require('http-errors');
const debugServer = require('debug')('inventory-application:server');
const path = require('path');
const env = require('./.env.config');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = env.NODE_ENV === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(env.PORT || 3000);

server.on('error', (err) => {
  switch (err.code) {
    case 'EACCES':
      debugServer('Permission denied');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debugServer('Address already in use');
      process.exit(1);
      break;
    default:
      throw err;
  }
});

server.on('listening', () =>
  debugServer(`Listening on ${server.address().port}`)
);

const logger = require('./logger');
const express = require('express');
const app = express();

// set the port value
app.set('port', 3011);

// set the host value
app.set('host', 'localhost');

// define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to feathers application');
});

const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);

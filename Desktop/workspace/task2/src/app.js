const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const mongoose = require('mongoose');
const http = require('http'); // add this line
const app = express(feathers());
const server = http.createServer(app); // modify this line

// ... rest of the code
server.listen(3011);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.configure(express.rest());

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const userService = require('./services');

userService(app);
app.listen(3011).on('listening', () => {
  console.log('Feathers server listening on localhost:3011');
});


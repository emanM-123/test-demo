const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');

// Create a new Express app
const app = express();

// Create a new HTTP server and attach the Express app to it
const server = http.createServer(app);

// Create a new Socket.IO server and attach it to the HTTP server
const io = socketio(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Authenticate the client using a JWT token
  const token = socket.handshake.query.token;
  try {
    const decodedToken = jwt.verify(token, 'mysecretkey');
    // Add the user ID to the socket object for later use
    socket.userId = decodedToken.userId;
  } catch (err) {
    console.log('Invalid token:', token);
    socket.disconnect();
    return;
  }

  // Join a room based on the user ID
  socket.join(socket.userId);

  // Handle incoming messages
  socket.on('message', (data) => {
    console.log('Received message:', data);
    // Broadcast the message to all clients in the same room
    io.to(socket.userId).emit('message', data);
  });

  // Handle disconnection events
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
// Start the HTTP server
server.listen(3000, () => {
  console.log('Server started on port 3000');
});

// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidV4 = require('uuid/v4');


const PORT = 5000;

const colors = ['Maroon', 'Green', 'Purple', 'Blue'];
var onlineCount = 0;
var colorIndex = 0;

function getColor() {
  let color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
  return color;
}

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

function safeSend(socket, messageAsString) {
  try {
    socket.send(messageAsString, (error) => {
      if(error) {
        console.log(error);
      }
    });
  } catch(error){
    console.log(error);
  }
}

function broadcastMessage(message) {
  const messageAsString = JSON.stringify(message);
  wss.clients.forEach(function each(client) {
    safeSend(client, messageAsString);
  });
}

function systemMessage(event, onlineCount) {
  const message = {
    type: "Status",
    id: uuidV4(),
    event: event,
    onlineCount: onlineCount
  };
  return message;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  onlineCount += 1;
  const color = getColor();
  broadcastMessage(systemMessage("connected", onlineCount));

  console.log('Client connected, assigned color', color);

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    // parse it, assign a UUID and assign this user's color
    const incomingMessage = JSON.parse(message);
    incomingMessage.id = uuidV4();
    incomingMessage.color = color;

    // Broadcast to all.
    broadcastMessage(incomingMessage);

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () =>{
    onlineCount -= 1;
    const disconnectMessage = JSON.stringify(systemMessage("disconnected", onlineCount));

    // send an updated to everyone else
    wss.clients
    .filter(clientSocket => clientSocket !== ws)
    .forEach(function each(client) {
      safeSend(client, disconnectMessage);
    });
    console.log('Client disconnected', onlineCount);
  });

});
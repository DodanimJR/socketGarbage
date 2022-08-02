const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
app.get('/', (req, res) => {
 res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    var clients = [];
    //console.log('se conecto un usuario');
    //io.emit('alertCon','se conecto un usuario');
    
    // var clients = findClientsSocket();
    // console.log(clients);
    socket.on('mensajeDeChat', (mensaje) => {
    console.log('se recibio mensaje')
    io.emit('mensajeDeChat', mensaje);
    console.log('se envio mensaje')
    })
    socket.on('disconnect', () => {
        io.emit('alertDisc','se desconecto un usuario');
        console.log('se desconecto un usuario!')
        
    })
    socket.on('new user', (username) => {
        console.log(`${username} has joined the chat! ✋`);
        io.emit('alertCon',username);
        clients.push(username);
        console.log('usuarios conectados: ', clients);
        io.emit("new user", clients);
      })
});

server.listen(3000, 'localhost', () => {
 console.log('listening on localhost:3000');
});
    
  
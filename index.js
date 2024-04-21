const express = require('express');
const socketIO = require('socket.io');
const app = express();
const path = require('path');

const server = app.listen(3005, () => {
    console.log("server started");
})

app.use(express.static(path.join(__dirname)));
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log("A user is connected");

// listen for join event when a new user join
    socket.on('join', (username) => {
        socket.username = username;
        io.emit('chat message', `${socket.username} has joined the chat`);
    })

// listen for chat message event from clients
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

// listen for disconnect event when a user leave
    socket.on('disconnect', () => {
        console.log('disconnected from user');
        if(socket.username){
            io.emit('chat message', `${socket.username} has left the chat`);
        }
    })
})        
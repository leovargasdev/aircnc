const cors = require('cors');
const http = require('http');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io =socketio(server);
const onlineUsers = {}; //Lista de usuário conectados

// Conexão com o mondoDB Atlas
mongoose.connect('mongodb+srv://adminTopper:admin@minhabase-zmb6f.mongodb.net/rocketseat?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Adicionando os id's dos usuários conectados à aplicação
io.on('connect', socket => {
    const { user_id } = socket.handshake.query;
    onlineUsers[user_id] = socket.id;
});

// Exportando o io para todas as rotas terem acesso
app.use((req, res, next) => {
    req.io = io;
    req.onlineUsers = onlineUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);

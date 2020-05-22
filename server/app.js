const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const users = require('./users')();

const message = (name, text, id, sendTime) => ({name, text, id, sendTime})

io.on('connection', socket => {
    socket.on('userJoined', (data, cb) => {
        if (!data.name || !data.room) {
            return cb('Данные некорректны');
        }
        socket.join(data.room);
        users.remove(socket.id);
        users.add({
            id: socket.id,
            name: data.name,
            room: data.room
        });
        cb({userId: socket.id});
        io.to(data.room).emit('updateUsers', users.getByRoom(data.room));
        socket.emit('newMessage', message('admin', `Добро пожаловать, ${data.name}`));
        socket.broadcast
            .to(data.room)
            .emit('newMessage', message('admin', `Пользователь ${data.name} подключен(-а)`))
    })

    socket.on('createMessage', (data, cb) => {
        if (!data.text) {
            return cb('Текст не может быть пустым')
        }

        const user = users.get(data.id);
        if (user) {
            io.to(user.room).emit('newMessage', message(user.name, data.text, data.id, data.sendTime));
        }
        cb()
    })

    socket.on('userLeft', (id, cb) => {
        const user = users.remove(id);
        if (user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
            io.to(user.room).emit('newMessage', message('admin', `Пользователь ${user.name} вышел(-а) из комнаты`));
        }
        cb();
    })

    socket.on('disconnect', () => {
        const user = users.remove(socket.id);
        if (user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
            io.to(user.room).emit('newMessage', message('admin', `Пользователь ${user.name} вышел(-а) из комнаты`));
        }
    })
})

module.exports = {
    app, server
}

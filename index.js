var express = require('express');
var socket=require('socket.io');

var app=express();
var server = app.listen(5000, function(){
    console.log("server started at port 5000");
});

app.use(express.static('public'));
// to run ths type nodemon index
//scoket setup
var io=socket(server);
//scoket.io is now waitting and listening to connecction on server
//eachc clent will have its own different socket with server
io.on('connection',function(socket){
    console.log("connection has been made",socket.id)

    //here we will be listening to messages sent by client
    socket.on('chat',function(data){
        // to refer to all of the sockets , 'sockets' is used
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    })
})
var socketIO = require('socket.io'),
    socket = {};

socket.listen = function(server) {
  var io = socketIO.listen(server);

  io.sockets.on('connection', function (wsocket) {

    wsocket.on('message', function(msg){
      console.log('message: ' + msg);
      socket.sendToAllClient('message', msg);
    });

    wsocket.on('disconnect', function(){
      console.log('user disconnected');
    });

  });

  socket.sendToAllClient = function(type, data) {
    data = JSON.stringify (data);
    // io.sockets.clients.forEach (function (client) {
    //   if (client != null) {
    //     client.send (data);
    //   }
    // });
    io.emit(type, data);
  };

};

module.exports = socket;

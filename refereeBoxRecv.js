var socket = require('./socket');
var dgram = require ('dgram');
var proto = require ('protobufjs');

var refereeBoxConfig = function(){
  var REFEREE_PORT = 10003,
      HOST = '0.0.0.0';

  var builder = proto.loadProtoFile ("proto/referee.proto"),
      SSL_Referee = builder.build ("SSL_Referee");

  var referee_client = dgram.createSocket ('udp4');
  referee_client.on ('listening', function () {
    var address = referee_client.address ();
    console.log ('UDP Referee_Client listening on ' + address.address + ":" + address.port);
    referee_client.setBroadcast (true);
    referee_client.setMulticastTTL (128);
    referee_client.addMembership ('224.5.23.1', HOST);
  });

  referee_client.on('message', function (message, remote) {
    var packet = SSL_Referee.decode (message);
    packet.type = "referee";
    socket.sendToAllClient('referee', packet);
  });

  referee_client.bind (REFEREE_PORT, HOST);
};

module.exports = refereeBoxConfig;

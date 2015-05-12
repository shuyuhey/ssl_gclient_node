var socket = require('./socket');
var dgram = require ('dgram');
var proto = require ('protobufjs');

var sslVisionConfig = function() {
  var VISION_PORT = 10006,
      HOST = '0.0.0.0';

  var builder = proto.loadProtoFile ("proto/messages_robocup_ssl_wrapper.proto"),
      SSL_WrapperPacket = builder.build ("SSL_WrapperPacket");

  var vision_client = dgram.createSocket ('udp4');
  vision_client.on ('listening', function () {
    var address = vision_client.address ();
    console.log ('UDP Vision_Client listening on ' + address.address + ":" + address.port);
    vision_client.setBroadcast (true);
    vision_client.setMulticastTTL (128);
    vision_client.addMembership ('224.5.23.2', HOST);
  });

  vision_client.on('message', function (message, remote) {
    var packet = SSL_WrapperPacket.decode (message);
    packet.type = "vision";
    socket.sendToAllClient('vision', packet);
  });

  vision_client.bind (VISION_PORT, HOST);
};

module.exports = sslVisionConfig;

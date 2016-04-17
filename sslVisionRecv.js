var socket = require('./socket');
var dgram = require ('dgram');
var proto = require ('protobufjs');

var sslVisionConfig = function() {
  var VISION_PORT = 10006,
      HOST = '0.0.0.0';

  var protoFilePath = 'proto/messages_robocup_ssl_wrapper.proto';
  var protoName = 'SSL_WrapperPacket';
  if (process.env.LEGACY) {
    protoFilePath = 'proto/messages_robocup_ssl_wrapper_legacy.proto';
    protoName = 'RoboCup2014Legacy.Wrapper.SSL_WrapperPacket';
  }

  var builder = proto.loadProtoFile (protoFilePath),
      SSL_WrapperPacket = builder.build (protoName);

  var vision_client = dgram.createSocket ('udp4');
  vision_client.on ('listening', function () {
    var address = vision_client.address ();
    console.log ('UDP Vision_Client listening on ' + address.address + ":" + address.port);
    vision_client.setBroadcast (true);
    vision_client.setMulticastTTL (128);
    vision_client.addMembership ('224.5.23.2');
  });

  vision_client.on('message', function (message, remote) {
    var packet = SSL_WrapperPacket.decode (message);
    packet.type = "vision";
    socket.sendToAllClient('vision', packet);
  });

  vision_client.bind (VISION_PORT, HOST);
};

module.exports = sslVisionConfig;

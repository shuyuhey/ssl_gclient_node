var ws = require ('websocket.io');
var server = ws.listen (8888, function () {
  console.log ('Server running at 0.0.0.0:8888');
});

server.on ('connection', function (socket) {
    socket.on ('message', function (data) {
        temp_signal (data);
    });
});

var temp_signal = function (data) {
    data = JSON.stringify (data);
    server.clients.forEach (function (client) {
        if (client != null) {
            client.send (data);
        }
    });
};

var VISION_PORT = 10002;
var HOST = '0.0.0.0';
var dgram = require ('dgram');

var proto = require ('protobufjs');
var builder = proto.loadProtoFile ("proto/messages_robocup_ssl_wrapper.proto"),     SSL_WrapperPacket = builder.build ("SSL_WrapperPacket");

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
    temp_signal (packet);
});
vision_client.bind (VISION_PORT, HOST);

var REFEREE_PORT = 10003;
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
    temp_signal (packet);
});
referee_client.bind (REFEREE_PORT, HOST);

builder = proto.loadProtoFile ("proto/referee.proto");
var SSL_Referee = builder.build ("SSL_Referee");

var express = require ('express');
var app = express();

app.set ('view engine', 'ejs');
app.set ('views', __dirname + '/views');
app.use (express.static(__dirname + '/public'));

app.get ('/', function (req, res) {
    res.render ('index', { title: 'Express Sample' });
});

app.listen (8080);

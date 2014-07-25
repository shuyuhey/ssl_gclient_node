var ws = require('websocket.io');
var server = ws.listen(8888, function () {
  console.log('\033[96m Server running at 0.0.0.0:8888 \033[39m');
});

server.on('connection', function(socket) {
    socket.on('message', function(data) {
        // 実行時間を追加
        var data = JSON.parse(data);
        var d = new Date();
        data.time = d.getFullYear()  + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        data = JSON.stringify(data);
        console.log('\033[96m' + data + '\033[39m');

        // 受信したメッセージを全てのクライアントに送信する
        server.clients.forEach(function(client) {
            client.send(data);
        });
    });
});


var temp_signal = function (data) {
    data = JSON.stringify(data);
    server.clients.forEach(function(client) {
        client.send(data);
    });
};

var PORT = 10020;
var HOST = '0.0.0.0';
var dgram = require('dgram');
var client = dgram.createSocket('udp4');

var proto = require ('protobufjs');
var builder = proto.loadProtoFile("proto/messages_robocup_ssl_wrapper.proto"),     SSL_WrapperPacket = builder.build ("SSL_WrapperPacket");

client.on('listening', function () {
    var address = client.address();
    console.log('UDP Client listening on ' + address.address + ":" + address.port);
    client.setBroadcast(true);
    client.setMulticastTTL(128);
    client.addMembership('224.5.23.2', HOST);
});

client.on('message', function (message, remote) {
    var packet = SSL_WrapperPacket.decode (message);
    console.log('A: Epic Command Received. Preparing Relay.');
    console.log('B: From: ' + remote.address + ':' + remote.port +' - ' + packet.detection.robots_blue.length);
    temp_signal (packet);
});

var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index', { title: 'Express Sample' });
});

app.listen(8080);

client.bind(PORT, HOST);

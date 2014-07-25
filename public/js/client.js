var ws = new WebSocket ('ws://localhost:8888/');

ws.onmessage = function (event) {
    var data = JSON.parse(event.data);
    $ ("#test_field").append ($ ('<div/>').text (data));
};

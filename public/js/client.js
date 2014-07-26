var ws = new WebSocket ('ws://localhost:8888/');

ws.onmessage = function (event) {
    var data = JSON.parse(event.data);
    // $ ("#test_field").append ($ ('<div/>').text (data));
    if (data.type === "vision") {
        draw (data);
    }
    else if (data.type === "referee") {
        console.log (data);
    }
};

var canvas = document.getElementById('field');
var ctx = null;
if (canvas.getContext){
    ctx = canvas.getContext('2d');
}

canvas.height = $ ("#field").height ();
canvas.width  = $ ("#field").width ();

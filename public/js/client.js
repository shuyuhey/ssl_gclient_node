var ws = new WebSocket ('ws://localhost:8888/');

ws.onopen = function (event) {
    console.log (event);
};

ws.onmessage = function (event) {
    var data = JSON.parse(event.data);
    // $ ("#test_field").append ($ ('<div/>').text (data));
    if (data.type === "vision") {
        draw (data);
    }
    else if (data.type === "referee") {
        referee (data);
    }
};

ws.onclose = function (event) {
    console.log (event);
};

var canvas = document.getElementById('field');
var ctx = null;
if (canvas.getContext){
    ctx = canvas.getContext('2d');
}

canvas.height = $ ("#field").height ();
canvas.width  = $ ("#field").width ();

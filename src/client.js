import {draw} from './obj_draw';

var socket = io();

socket.on('vision', function (data) {
  draw (JSON.parse(data));
});

socket.on('referee', function (data) {
  referee(JSON.parse(data));
});

socket.on('message', function (data) {
  console.log(data);
});

export var canvas = document.getElementById('field');
export var ctx = null;
if (canvas.getContext){
  ctx = canvas.getContext('2d');
}

canvas.height = $ ("#field").height ();
canvas.width  = $ ("#field").width ();

// export canvas;

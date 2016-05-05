import Field from './field';
import Ball from './ball';
import {canvas, ctx} from './client';

var ball_color  = 'rgb(255, 118, 0)';
var blue_color  = 'rgb(0, 0, 255)';
var yellow_color  = 'rgb(255, 255, 0)';
var initialized = false;

var half_width  = 0;
var half_height = 0;
var w_scale     = 0;
var h_scale     = 0;
var field_obj;
var ball_obj = undefined;

function draw (packet) {
    if (!initialized) {
      initialized = true;
      field_obj = new Field(ctx, canvas.width, canvas.height);
    }
  field_obj.render();
  if (packet.detection.balls.length > 0) {
    var ball = packet.detection.balls[0];
  }
  ball_obj = ball_obj || new Ball(ctx, ball.x, ball.y);
  ball_obj.update(ball.x, ball.y);
  ball_obj.render();
}

function draw_robot (robot, color) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.fillStyle = color;
    ctx.arc(translate_x (robot.x),
            translate_y (robot.y),
            w_scale * object_size.robot_radius, - robot.orientation - (50 * Math.PI / 180), - robot.orientation - ( -  50 * Math.PI / 180), true);
    ctx.stroke ();
    ctx.fill ();
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "12px 'sans-serif'";
    ctx.fillText (robot.robot_id,
                  translate_x (robot.x - object_size.robot_radius / 2),
                  translate_y (robot.y - object_size.robot_radius / 2),
                  w_scale * object_size.robot_radius);
}

function translate_x (x) {
    return Math.round (x * w_scale + w_scale * half_width);
}

function translate_y (y) {
    return Math.round (y * - h_scale + h_scale * half_height);
}

export {draw}

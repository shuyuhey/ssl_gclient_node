import Field from './field';
import Ball from './ball';
import Robot from './robot';
import {canvas, ctx} from './client';

var initialized = false;

var field_obj;
var ball_obj = undefined;
var robot_objs = {};

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

  var robots = packet.detection.robots_blue;
  var robotrender = function (robots, color) {
    if (robots.length > 0) {
      for (var i in robots) {
        robot_objs[robots[i].robot_id+color] = robot_objs[robots[i].robot_id+color] || new Robot(ctx, robots[i].robot_id, robots[i].x, robots[i].y, robots[i].orientation, color);
        robot_objs[robots[i].robot_id+color].update(robots[i].x, robots[i].y, robots[i].orientation);
        robot_objs[robots[i].robot_id+color].render();
      }
    }
  };

  robotrender(robots, 'blue');
  robots = packet.detection.robots_yellow;
  robotrender(robots, 'yellow');
}

export {draw}

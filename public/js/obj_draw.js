var ball_color  = 'rgb(255, 118, 0)';
var field_color = 'rgb(0, 171, 10)';
var line_color  = 'rgb(255, 255, 255)';
var blue_color  = 'rgb(0, 0, 255)';
var yellow_color  = 'rgb(255, 255, 0)';
var initialized = false;

var half_width  = 0;
var half_height = 0;
var w_scale     = 0;
var h_scale     = 0;

function draw (packet) {
    if (!initialized) {
        half_width   = field.total_field_length / 2;
        half_height  = field.total_field_width  / 2;
        w_scale = canvas.width / field.total_field_length;
        h_scale = canvas.height / field.total_field_width;
        initialized = true;
    }

    ctx.fillStyle = field_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw_line ();
    draw_ball (packet.detection.balls);
    for (var i = 0; i < packet.detection.robots_blue.length; i++) {
        draw_robot (packet.detection.robots_blue[i], blue_color);
    }
    for (    i = 0; i < packet.detection.robots_yellow.length; i++) {
        draw_robot (packet.detection.robots_yellow[i], yellow_color);
    }
}

function draw_line () {
    ctx.beginPath();
    ctx.strokeStyle = line_color;
    ctx.strokeRect(( w_scale * field.field_arround_margin),
                   ( h_scale * field.field_arround_margin),
                   ( w_scale * field.field_length),
                   ( h_scale * field.field_width));
    // Center line
    ctx.beginPath ();
    ctx.lineTo (translate_x (0), translate_y ( - field.field_width / 2));
    ctx.lineTo (translate_x (0), translate_y (   field.field_width / 2));
    ctx.closePath ();
    ctx.stroke ();

    ctx.beginPath ();
    ctx.lineTo (translate_x ( - field.field_length / 2), translate_y (0));
    ctx.lineTo (translate_x ( - field.center_circle_radius), translate_y (0));
    ctx.closePath ();
    ctx.stroke ();
    ctx.beginPath ();
    ctx.lineTo (translate_x (field.center_circle_radius), translate_y (0));
    ctx.lineTo (translate_x (field.field_length / 2), translate_y (0));
    ctx.closePath ();
    ctx.stroke ();

    // Center Circle
    ctx.beginPath();
    ctx.arc(translate_x (0), translate_y (0),
            w_scale * field.center_circle_radius, 0, Math.PI*2, false);
    ctx.stroke();

    // Defense Area
    ctx.beginPath();
    ctx.lineTo (translate_x ( - field.field_length / 2 + field.defense_radius),
            translate_y (field.defense_stretch / 2));
    ctx.arc(translate_x ( - field.field_length / 2),
            translate_y (field.defense_stretch / 2),
            w_scale * field.defense_radius, 0, - Math.PI / 2, true);
    ctx.arc(translate_x ( - field.field_length / 2),
            translate_y ( - field.defense_stretch / 2),
            w_scale * field.defense_radius, Math.PI / 2, 0, true);
    ctx.lineTo (translate_x ( - field.field_length / 2 + field.defense_radius),
                translate_y ( - field.defense_stretch / 2));
    ctx.closePath ();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo (translate_x (field.field_length / 2 -  field.defense_radius),
            translate_y (field.defense_stretch / 2));
    ctx.arc(translate_x (field.field_length / 2),
            translate_y (field.defense_stretch / 2),
            w_scale * field.defense_radius, - Math.PI, - Math.PI / 2, false);
    ctx.arc(translate_x (field.field_length / 2),
            translate_y ( - field.defense_stretch / 2),
            w_scale * field.defense_radius, Math.PI / 2, Math.PI, false);
    ctx.lineTo (translate_x (field.field_length / 2 -  field.defense_radius),
                translate_y ( - field.defense_stretch / 2));
    ctx.closePath ();
    ctx.stroke();
}

function draw_ball (balls) {
    for (var i = 0; i < balls.length; i++ ) {
        var ball = balls[i];
        ctx.beginPath ();
        ctx.fillStyle = ball_color;

        var x = translate_x (ball.x);
        var y = translate_y (ball.y);
        ctx.arc (x, y, w_scale * object_size.ball_radius, 0, Math.PI*2.0, true);
        ctx.fill();
    }
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

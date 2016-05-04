import DrawComponent from './draw-component';
import FillRectangle from './fill-rectangle';
import StrokeRectangle from './stroke-rectangle';

export default class Field extends DrawComponent {
  constructor(context, canvasWidth, canvasHeight) {
    super (context);
    var field_2012 = {
      line_width                        :   10,
      field_length                      : 6050,
      field_width                       : 4050,
      boundary_width                    :  250,
      referee_width                     :  425,
      goal_width                        :  700,
      goal_depth                        :  180,
      goal_wall_width                   :   20,
      center_circle_radius              :  500,
      defense_radius                    :  800,
      defense_stretch                   :  350,
      free_kick_from_defense_dist       :  200,
      penalty_spot_from_field_line_dist :  750,
      penalty_line_from_spot_dist       :  400,
      // Not official parameters
      field_arround_margin              :  300
    };
    this.field = field_2012;
    this.field.total_field_length = this.field.field_length + this.field.field_arround_margin * 2;
    this.field.total_field_width  = this.field.field_width  + this.field.field_arround_margin * 2;
    this.fieldColor = 'rgb(0, 171, 10)';
    this.lineColor  = 'rgb(255, 255, 255)';
    var transparent = 'rgba(0, 0, 0, 0)';
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.w_scale = this.canvasWidth / this.field.total_field_length;
    this.h_scale = this.canvasHeight /this. field.total_field_width;

    this.lines = [];

    this.lines.push(new FillRectangle(this.ctx,
                                  0, 0, this.canvasWidth, this.canvasHeight,
                                  this.fieldColor));
    this.lines.push(new StrokeRectangle(this.ctx,
                                  this.scaleW(this.field.field_arround_margin),
                                  this.scaleH(this.field.field_arround_margin),
                                  this.scaleW(this.field.field_length),
                                  this.scaleH(this.field.field_width),
                                  this.lineColor, this.field.line_width));
  }

  scaleW(val) { return this.w_scale * val; }
  scaleH(val) { return this.h_scale * val; }

  render() {
    this.lines.map(l => l.render());
  }

  renderLine() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = line_color;
    this.ctx.strokeRect(( w_scale * field.field_arround_margin),
                   ( h_scale * field.field_arround_margin),
                   ( w_scale * field.field_length),
                   ( h_scale * field.field_width));
    // Center line
    this.ctx.beginPath ();
    this.ctx.lineTo (translate_x (0), translate_y ( - field.field_width / 2));
    this.ctx.lineTo (translate_x (0), translate_y (   field.field_width / 2));
    this.ctx.closePath ();
    this.ctx.stroke ();

    this.ctx.beginPath ();
    this.ctx.lineTo (translate_x ( - field.field_length / 2), translate_y (0));
    this.ctx.lineTo (translate_x ( - field.center_circle_radius), translate_y (0));
    this.ctx.closePath ();
    this.ctx.stroke ();
    this.ctx.beginPath ();
    this.ctx.lineTo (translate_x (field.center_circle_radius), translate_y (0));
    this.ctx.lineTo (translate_x (field.field_length / 2), translate_y (0));
    this.ctx.closePath ();
    this.ctx.stroke ();

    // Center Circle
    this.ctx.beginPath();
    this.ctx.arc(translate_x (0), translate_y (0),
            w_scale * field.center_circle_radius, 0, Math.PI*2, false);
    this.ctx.stroke();

    // Defense Area
    this.ctx.beginPath();
    this.ctx.lineTo (translate_x ( - field.field_length / 2 + field.defense_radius),
                translate_y (field.defense_stretch / 2));
    this.ctx.arc(translate_x ( - field.field_length / 2),
            translate_y (field.defense_stretch / 2),
            w_scale * field.defense_radius, 0, - Math.PI / 2, true);
    this.ctx.arc(translate_x ( - field.field_length / 2),
            translate_y ( - field.defense_stretch / 2),
            w_scale * field.defense_radius, Math.PI / 2, 0, true);
    this.ctx.lineTo (translate_x ( - field.field_length / 2 + field.defense_radius),
                translate_y ( - field.defense_stretch / 2));
    this.ctx.closePath ();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.lineTo (translate_x (field.field_length / 2 -  field.defense_radius),
                translate_y (field.defense_stretch / 2));
    this.ctx.arc(translate_x (field.field_length / 2),
            translate_y (field.defense_stretch / 2),
            w_scale * field.defense_radius, - Math.PI, - Math.PI / 2, false);
    this.ctx.arc(translate_x (field.field_length / 2),
            translate_y ( - field.defense_stretch / 2),
            w_scale * field.defense_radius, Math.PI / 2, Math.PI, false);
    this.ctx.lineTo (translate_x (field.field_length / 2 -  field.defense_radius),
                translate_y ( - field.defense_stretch / 2));
    this.ctx.closePath ();
    this.ctx.stroke();
  }
}

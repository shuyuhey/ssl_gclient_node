import DrawComponent from './draw-component';
import FillRectangle from './fill-rectangle';
import StrokeRectangle from './stroke-rectangle';
import Line from './line';
import Circle from './circle';
import Arc from './arc';

export default class Field extends DrawComponent {
  constructor(context, canvasWidth, canvasHeight) {
    super (context);
    var field_2012 = {
      line_width                        :   10,
      length                      : 6050,
      width                       : 4050,
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
      arround_margin              :  300
    };
    var field_2014 = {
      line_width                        :   10,
      length                      : 9000,
      width                       : 6000,
      boundary_width                    :  250,
      referee_width                     :  700,
      goal_width                        :  1000,
      goal_depth                        :  180,
      goal_wall_width                   :   20,
      center_circle_radius              :  500,
      defense_radius                    :  1000,
      defense_stretch                   :  500,
      free_kick_from_defense_dist       :  200,
      penalty_spot_from_field_line_dist :  750,
      penalty_line_from_spot_dist       :  400,
      // Not official parameters
      arround_margin              :  300
    };
    this.field = field_2014;
    this.field.total_length = this.field.length + this.field.arround_margin * 2;
    this.field.total_width  = this.field.width  + this.field.arround_margin * 2;
    this.fieldColor = 'rgb(0, 171, 10)';
    this.lineColor  = 'rgb(255, 255, 255)';
    var transparent = 'rgba(0, 0, 0, 0)';
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.w_scale = this.canvasWidth / this.field.total_length;
    this.h_scale = this.canvasHeight /this. field.total_width;

    this.offsetX = this.field.total_length / 2;
    this.offsetY = this.field.total_width / 2;
    this.ctx.setTransform(this.w_scale, 0, 0, this.h_scale, this.w_scale * this.offsetX, this.h_scale * this.offsetY);

    this.lines = [];
    this.lines.push(new FillRectangle(this.ctx,
                                      -this.field.total_length / 2,
                                      -this.field.total_width / 2,
                                      this.field.total_length,
                                      this.field.total_width,
                                      this.fieldColor));
    this.lines.push(new StrokeRectangle(this.ctx,
                                        this.field.arround_margin - this.field.total_length / 2,
                                        this.field.arround_margin - this.field.total_width / 2,
                                        this.field.length,
                                        this.field.width,
                                        this.lineColor, this.field.line_width));
    this.lines.push(new Line(this.ctx,
                             0, -this.field.width / 2,
                             0,  this.field.width / 2,
                             this.lineColor));
    this.lines.push(new Line(this.ctx,
                             -this.field.length / 2, 0,
                             this.field.length / 2,  0,
                             this.lineColor));
    this.lines.push(new Circle(this.ctx,
                               0, 0,
                               this.field.center_circle_radius,
                               this.lineColor));
    this.lines.push(new Line(this.ctx,
                             -this.field.length / 2 + this.field.defense_radius,
                             this.field.defense_stretch / 2,
                             -this.field.length / 2 + this.field.defense_radius,
                             -this.field.defense_stretch / 2,
                             this.lineColor));
    this.lines.push(new Arc(this.ctx,
                            -this.field.length / 2,
                            -this.field.defense_stretch / 2,
                            this.field.defense_radius,
                            0, - Math.PI / 2, this.lineColor));
    this.lines.push(new Arc(this.ctx,
                            -this.field.length / 2,
                            this.field.defense_stretch / 2,
                            this.field.defense_radius,
                            Math.PI / 2, 0, this.lineColor));
    this.lines.push(new Line(this.ctx,
                             this.field.length / 2 - this.field.defense_radius,
                             -this.field.defense_stretch / 2,
                             this.field.length / 2 - this.field.defense_radius,
                             this.field.defense_stretch / 2,
                             this.lineColor));
    this.lines.push(new Arc(this.ctx,
                            this.field.length / 2,
                            this.field.defense_stretch / 2,
                            this.field.defense_radius,
                            -Math.PI, Math.PI / 2, this.lineColor));
    this.lines.push(new Arc(this.ctx,
                            this.field.length / 2,
                            -this.field.defense_stretch / 2,
                            this.field.defense_radius,
                            -Math.PI / 2, -Math.PI, this.lineColor));
  }

  render() {
    this.lines.map(l => l.render());
  }
}

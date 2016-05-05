import DrawComponent from './draw-component';

export default class Robot extends DrawComponent {
  constructor(context, id, x, y, orientation, team) {
    super(context);
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = 85;
    this.orientation = orientation;
    var blue_color  = 'rgb(0, 0, 255)';
    var yellow_color  = 'rgb(255, 255, 0)';
    this.lineColor = 'rgb(0, 0, 0)';
    if (team === 'yellow') {
      this.Color = yellow_color;
    } else {
      this.Color = blue_color;
    }
  }

  render() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.fillStyle = this.Color;
    this.ctx.arc(this.x, this.y, this.radius,
                 -this.orientation - (50 * Math.PI / 180),
                 -this.orientation - (-50 * Math.PI / 180), true);
    this.ctx.stroke ();
    this.ctx.fill ();
    this.ctx.fillStyle = this.Color;
    this.ctx.font = "200px 'sans-serif'";
    this.ctx.fillText (this.id,
                       this.x - this.radius/2,
                       this.y - this.radius * 1.5,
                       this.radius);
  }

  update(x, y, orientation) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
  }
}

import DrawComponent from './draw-component';

export default class Arc extends DrawComponent {
  constructor(context, x, y, radius, start, end, lineColor) {
    super(context);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.start = start;
    this.end = end;
    this.lineColor = lineColor;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.arc(this.x, this.y, this.radius, this.start, this.end, true);
    this.ctx.stroke();
  }
}

import DrawComponent from './draw-component';

export default class Circle extends DrawComponent {
  constructor(context, x, y, radius, lineColor) {
    super(context);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.lineColor = lineColor;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    this.ctx.stroke();
  }
}

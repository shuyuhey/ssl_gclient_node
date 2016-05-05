import DrawComponent from './draw-component';

export default class Line extends DrawComponent {
  constructor(context, x1, y1, x2, y2, lineColor) {
    super(context);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.lineColor = lineColor;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.lineTo(this.x1, this.y1);
    this.ctx.lineTo(this.x2, this.y2);
    this.ctx.closePath();
    this.ctx.stroke();
  }
}

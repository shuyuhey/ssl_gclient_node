import DrawComponent from './draw-component';

export default class StrokeRectangle extends DrawComponent {
  constructor(context, x, y, w, h, lineColor, width = 10) {
    super(context);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.width = width;
    this.lineColor = lineColor;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.fillStyle = this.transparent;
    this.ctx.strokeRect(this.x, this.y, this.w, this.h);
  }
}

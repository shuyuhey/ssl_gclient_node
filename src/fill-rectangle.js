import DrawComponent from './draw-component';

export default class FillRectangle extends DrawComponent {
  constructor(context, x, y, w, h, fillColor) {
    super(context);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fillColor = fillColor;
  }

  render() {
    this.ctx.fillStyle = this.fillColor;
    this.strokeStyle = this.transparent;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

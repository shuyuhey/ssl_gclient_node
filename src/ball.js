import DrawComponent from './draw-component';

export default class Ball extends DrawComponent {
  constructor(context, x, y) {
    super(context);
    this.x = x;
    this.y = y;
    this.radius = 30;
    this.Color = 'rgb(255, 118, 0)';
  }

  render() {
    this.ctx.beginPath ();
    this.ctx.fillStyle = this.Color;
    this.ctx.arc (this.x, this.y, this.radius, 0, Math.PI*2.0, true);
    this.ctx.fill();
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }
}

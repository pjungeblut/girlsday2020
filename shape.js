// Hier steht der Quelltext zum Zeichnen der einzelnen Felder.
// Wir haben verschiedene Formen zur Auswahl,
// die jeweils anders gemalt werden muessen.
//
// Hier muessen wir nichts veraendern.

class Shape {
  constructor(ctx) {
    this.ctx = ctx;
  }
}

class Rect extends Shape {
  constructor(ctx) {
    super(ctx);
    this.HW_RATIO = 0.5;
  }

  draw(x, y, dim, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.rect(x + 0.5, y + 0.5, dim, dim / 2);
    this.ctx.fill();
    this.ctx.stroke();
  }
}

class Square extends Shape {
  constructor(ctx) {
    super(ctx);
    this.HW_RATIO = 1;
  }

  draw(x, y, dim, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.rect(x + 0.5, y + 0.5, dim, dim);
    this.ctx.fill();
    this.ctx.stroke();
  }
}

class Hexagon extends Shape {
  constructor(ctx) {
    super(ctx);
    this.HW_RATIO = 0.75;
  }

  draw(x, y, dim, color) {
    const side = dim / 2;
    const y_offset = Math.sqrt(side * side - dim * dim / 4);

    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x + dim / 2 + 0.5, y + 0.5);
    this.ctx.lineTo(x + dim + 0.5, y + dim / 4 + 0.5);
    this.ctx.lineTo(x + dim + 0.5, y + 3 * dim / 4 + 0.5);
    this.ctx.lineTo(x + dim / 2 + 0.5, y + dim + 0.5);
    this.ctx.lineTo(x + 0.5, y + 3 * dim / 4 + 0.5);
    this.ctx.lineTo(x + 0.5, y + dim / 4 + 0.5);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }
}

class Diamond extends Shape {
  constructor(ctx) {
    super(ctx);
    this.HW_RATIO = 0.5;
  }

  draw(x, y, dim, color) {
    const side = dim / 2;
    const y_offset = Math.sqrt(side * side - dim * dim / 4);

    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x + dim / 2 + 0.5, y + 0.5);
    this.ctx.lineTo(x + dim + 0.5, y + dim / 2 + 0.5);
    this.ctx.lineTo(x + dim / 2 + 0.5, y + dim + 0.5);
    this.ctx.lineTo(x + 0.5, y + dim / 2 + 0.5);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }
}

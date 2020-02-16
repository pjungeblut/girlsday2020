class Wall {
  constructor(size, color) {
    this.size = size;
    this.bricks = new Array(size);
    for (let row = 0; row < size; ++row) {
      this.bricks[row] = new Array(size - row);
      for (let col = 0; col < size - row; ++col) {
        this.bricks[row][col] = color;
      }
    }
  }

  get_color(row, column) {
    return this.bricks[row][column];
  }

  set_color(row, column, color) {
    this.bricks[row][column] = color;
  }
}

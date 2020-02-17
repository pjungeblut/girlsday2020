// Diese Datei verwaltet das gesamte Feld.
// Hier werden die Funktionen definiert, um einem Feld eine Farbe zuzuweisen
// oder die Farbe eines Feldes abzufragen.
//
// In dieser Datei muessen wir nichts veraendern.

class Wall {
  constructor(size, colors, inital_color) {
    this.size = size;
    this.colors = colors;
    this.bricks = new Array(size);
    for (let row = 0; row < size; ++row) {
      this.bricks[row] = new Array(size - row);
      for (let col = 0; col < size - row; ++col) {
        this.bricks[row][col] = inital_color;
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

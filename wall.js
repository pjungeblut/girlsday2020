// Diese Datei verwaltet das gesamte Feld.
// Hier werden die Funktionen definiert, um einem Feld eine Farbe zuzuweisen
// oder die Farbe eines Feldes abzufragen.
//
// In dieser Datei muessen wir nichts veraendern.

class Wall {
  constructor(size, colors, inital_color, delay) {
    this.size = size;
    this.colors = colors;
    this.delay = delay;
    this.inital_color = inital_color;

    // 'bricks' enthaelt die echten Farben, 'displayed' enthaelt die
    // anzuzeigenden Farben.
    // Ein Aufruf von 'set_color' aktualisiert 'bricks' sofort und 'displayed'
    // erst nach Ablauf des Delays.
    this.bricks = new Array(size);
    this.displayed = new Array(size);
    for (let row = 0; row < size; ++row) {
      this.bricks[row] = new Array(size - row);
      this.displayed[row] = new Array(size - row);
    }
    this.init();

    // Warteschlange fuer die Befehle zum Setzen einer Farbe.
    // Ein Aufruf von 'set_color' legt eine neue Aufgabe in die Warteschlange.
    // Alle 'delay' Millisekunden wird einer der Befehle abgearbeitet, bis die
    // Warteschlange leer ist.
    this.last_operation = Date.now();
    this.queue = [];
  }

  init() {
    for (let row = 0; row < this.size; ++row) {
      for (let col = 0; col < this.size - row; ++col) {
        this.bricks[row][col] = this.inital_color;
        this.displayed[row][col] = this.inital_color;
      }
    }
  }

  get_color(row, column) {
    return this.bricks[row][column];
  }

  get_displayed_color(row, column) {
    return this.displayed[row][column];
  }

  set_color(row, column, color) {
    this.bricks[row][column] = color;
    this.queue.push({row: row, column: column, color: color});
  }

  work() {
    let counter = 1;
    while (this.queue.length != 0) {
      const front = this.queue.shift();
      const now = Date.now();
      if (now - this.last_operation >= counter * this.delay) {
        this.displayed[front.row][front.column] = front.color;
        counter++;
      } else {
        this.last_operation = Date.now();
        this.queue.unshift(front);
        return;
      }
    }
  }
}

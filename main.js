// In 'colors' werden die Farben gespeichert.
// Als Farben koennen die "meisten" englischen Farbnamen verwendet werden (und
// noch viele mehr.) Eine vollstaendige Liste findet sich zum Beispiel hier:
// https://developer.mozilla.org/de/docs/Web/CSS/Farben
const colors = ["white", "black"];

let rules = {};
for (let c of colors) rules[c] = {};

// In 'rules' werden die Regeln zum Kombinieren von zwei Farben definiert.
// Immer in der Form:
// rule["links"]["rechts"] = "neu";
rules["white"]["white"] = "white";
rules["white"]["black"] = "black";
rules["black"]["white"] = "black";
rules["black"]["black"] = "white";

// Berechnet die Farbe eines Feldes aus den Farben der beiden oberen Felder.
function get_color(left, right) {
  return rules[left][right];
}

window.addEventListener("load", () => {
  // 'size' speichert die Groesse des Spielfeldes, genauer die Anzahl der Felder
  // in der ersten Reihe.
  const size = 67;

  // Legt das Spielfeld an.
  // Der erste Parameter ist die Groesse der ersten Zeile, der zweite die
  // initiale Farbe von jedem Feld.
  const wall = new Wall(size, "white");

  // Einfaerben der ersten Zeile (wir beginnen bei 0 zu zaehlen).
  for (let i = 1; i < size; i *= 2) {
    wall.set_color(0, i, "black");
  }

  // Einfaerben aller unteren Zeilen.
  for (let i = 1; i < size; ++i) {
    for (let j = 0; j + i < size; ++j) {
      let left = wall.get_color(i - 1, j);
      let right = wall.get_color(i - 1, j + 1);
      wall.set_color(i, j, get_color(left, right));
    }
  }

  // Malt das Bild.
  // Fuer uns ist nur der zweite Parameter interessant, hier koennen wir die
  // Form der Felder auswaehlen. Moegliche Werte sind:
  // "square"
  // "rect"
  // "hexagon"
  // "diamond"
  const canvas = new Canvas("canvas", "hexagon", wall);

  // Fuellt die Info-Box am unteren Bildrand:
  const infobox = new InfoBox("info_n", "info_rules", size, colors, rules);
});

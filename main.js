// Diese Datei ist die einzige, in der wir Digne veraendern muessen, um neue
// Bilder zu erzeugen.
// Alles, was wie diese Zeilen hinter zwei Schraegstrichen steht, sind sog.
// Kommentare. Der Computer ignoriert das, aber wir als Entwickler koennen uns
// damit Notizen in den Quelltext schreiben.



// In 'colors' werden die Farben gespeichert.
//
// Als Farben koennen die "meisten" englischen Farbnamen verwendet werden (und
// noch viele mehr.) Eine vollstaendige Liste findet sich zum Beispiel hier:
// https://developer.mozilla.org/de/docs/Web/CSS/Farben
//
// Um auf die i-te Farbe in der Liste zuzugreifen, schreiben wir: colors[i]
// Achtung: Wir fangen immer bei 0 an zu zaehlen, colors[0] ist also die erste
// Farbe in der Liste, colors[1] die zweite, ...
const colors = ["white", "black"];

// Berechnet die Farbe eines Feldes aus den Farben der beiden oberen Felder.
// Die Eingabe sind die Positionen der beiden Farben darueber in der Farbliste
// 'colors'.
// Das Ergbenis ist die Position der neuen Farbe in der Farbliste 'colors'.
function compute_color(left, right) {
  const rules = [
    [0, 1],
    [1, 0]
  ];
  return rules[left][right];
}

window.addEventListener("load", () => {
  // 'size' speichert die Groesse des Spielfeldes, genauer die Anzahl der Felder
  // in der ersten Reihe.
  const size = 129;

  // Legt das Spielfeld an.
  // Der erste Parameter ist die Groesse der ersten Zeile, der zweite die Liste
  // von Farben und der dritte die initiale Farbe aller Felder.
  // Der dritte Parameter ist dabei nicht die Farbe selbst, sondern die Position
  // der Farbe in der Farbliste.
  const wall = new Wall(size, colors, 0);

  // Einfaerben der ersten Zeile.
  // Mit wall.set_color(i, j, c) koennen wir die Farbe vom Stein in der i-ten
  // Zeile und j-ten Spalte setzen.
  // Die Farbe wird dabei wieder nicht direkt angegeben, sonder die Position in
  // der Farbliste.
  for (let pos = 1; pos < size; pos *= 2) {
    wall.set_color(0, pos, 1);
  }

  // Einfaerben aller unteren Zeilen.
  // Wie oben koennen wir mit wall.set_color(...) die Farbe eines Feldes setzen.
  // Dafuer koennen wir mit wall.get_color(i, j) die Farbe in der i-ten Zeile
  // und j-ten Spalte abfragen. Als Ergebnis bekommen wir wieder nicht direkt
  // die Farbe, sondern nur die Position in der Farbliste.
  for (let i = 1; i < size; ++i) {
    for (let j = 0; j + i < size; ++j) {
      const left = wall.get_color(i - 1, j);
      const right = wall.get_color(i - 1, j + 1);
      wall.set_color(i, j, compute_color(left, right));
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

  // Fuellt die Info-Box am unteren Bildrand.
  // Hier muessen wir nichts veraendern.
  const infobox = new InfoBox("info_n", "info_rules", size, colors, compute_color);
});

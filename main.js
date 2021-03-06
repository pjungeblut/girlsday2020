// Was wir hier sehen der Quelltext, eine Sprache in der wir Menschen einem
// Computer sogenannte Befehle geben koennen.
//
// Alles, was wie diese Zeilen hinter zwei Schraegstrichen steht, sind
// Kommentare. Der Computer ignoriert das, aber wir als Entwicklerinnen koennen
// uns damit Notizen in den Quelltext schreiben, um anderen das Verstaendnis zu
// erleichtern.


// In 'colors' werden die Farben gespeichert.
//
// Als Farben koennen die "meisten" englischen Farbnamen verwendet werden (und
// noch viele mehr).
// Eine vollstaendige Liste findet sich zum Beispiel hier:
// https://developer.mozilla.org/de/docs/Web/CSS/Farben
//
// Um auf die i-te Farbe in der Liste zuzugreifen, schreiben wir: colors[i]
// Achtung: Wir fangen immer bei 0 an zu zaehlen, colors[0] ist also die erste
// Farbe in der Liste, colors[1] die zweite, ...
const colors = ["lightyellow", "darkslateblue", "lightcoral"];

// Berechnet die Farbe eines Feldes aus den Farben der beiden oberen Felder.
// Die Eingabe sind die Positionen der beiden Farben darueber in der Farbliste
// 'colors'.
// Das Ergebnis ist die Position der neuen Farbe in der Farbliste 'colors'.
function compute_color(left, right) {
  const rules = [
    [0, 2, 1],
    [2, 1, 0],
    [1, 0, 2]
  ];

  // Mit der Zeile unten greifen in der Tabelle oben auf Zeile "left" und
  // Spalte "right" zu.
  return rules[left][right];
}

// Diese Funktion gibt uns eine zufaellige Farbe aus der Farbliste.
// Auch hier wird nicht die Farbe selbst zurueckgegeben, sondern nur die
// Position in der Liste colors.
function random_color() {
  return Math.floor(Math.random() * colors.length);
}

window.addEventListener("load", () => {
  // 'size' speichert die Groesse des Spielfeldes, genauer die Anzahl der Felder
  // in der ersten Reihe.
  const size = 32;

  // Die Anzahl der Millisekunden, die es dauert, um eine Farbe in ein Feld zu
  // setzen.
  const delay = 10;

  // Legt das Spielfeld an.
  // Der erste Parameter ist die Groesse der ersten Zeile, der zweite die Liste
  // der Farben. Der dritte Parameter sagt, wie lange das Einfaerben von einem
  // Feldes dauert.
  const wall = new Wall(size, colors, delay);

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
  const infobox = new InfoBox("info_n", "info_delay", "info_rules", size, delay,
      colors, compute_color);

  // Was passiert, wenn der "Start"-Button gedrueckt wird?
  document.getElementById("start_button").addEventListener("click", () => {
    // Loesche alles, was noch vom letzten Klick in Arbeit sein koennte.
    // Hier muessen wir nichts aendern.
    wall.init();


    // Einfaerben eines Steins.
    // Mit wall.set_color(i, j, c) koennen wir die Farbe vom Stein in der i-ten
    // Zeile und j-ten Spalte setzen.
    // Die Farbe wird dabei wieder nicht direkt angegeben, sonder stattdessen
    // die Position in der Farbliste.
    //-------------------------------
    // wall.set_color(0, 1, 2);
    // wall.set_color(1, 2, 0);
    //-------------------------------

    // Einfaerben der ersten Zeile.
    // Hier setzen wir die oberste, also "nullte" Zeile mit zufaelligen Farben.
    //-------------------------------
    for (let i = 0; i < size; i = i + 1) {
      wall.set_color(0, i, random_color());
    }
    //-------------------------------

    // Einfaerben aller unteren Zeilen.
    // Wie oben koennen wir mit wall.set_color(...) die Farbe eines Feldes setzen.
    // Dafuer koennen wir mit wall.get_color(i, j) die Farbe in der i-ten Zeile
    // und j-ten Spalte abfragen. Als Ergebnis bekommen wir wieder nicht direkt
    // die Farbe, sondern nur eine Zahl: Die Position in der Farbliste.
    //-------------------------------
    for (let i = 1; i < size; i = i + 1) {
      for (let j = 0; j + i < size; j = j + 1) {
        const left = wall.get_color(i - 1, j);
        const right = wall.get_color(i - 1, j + 1);
        wall.set_color(i, j, compute_color(left, right));
      }
    }
    //-------------------------------

    // Als letztes den Befehl zum Malen.
    canvas.draw();
  });
});

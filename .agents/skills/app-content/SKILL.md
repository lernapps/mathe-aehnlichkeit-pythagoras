---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Explainer „Ähnlichkeit, Pythagoras und Trigonometrie“ (Strang `mathematik/geometrie`, Klassen 9-10, nur Deutsch). Auftrag: lernapps/apps#399, Teil des Mathe-Epics #402. Gemeinsame Regeln des Epics (Schreibweisen, Aufgaben, Quellen, Recap) gelten und stehen unten in Kurzform.

## Curriculum

Hessen, Gymnasium, Sek I, Klassen 9-10. Die Reihenfolge gibt die Lernlandkarte Mathematik (`https://lernapps.net/apps/map/mathematik/`, `requires`). KMK-Bildungsstandards 2022 und Kerncurriculum wurden nicht im Wortlaut geprüft (offen). Eigene Herleitungen und Aufgaben, nichts aus Schulbüchern.

## Competencies

Kapitel `vergroessern` · Vergrößern und verkleinern
- `aehnlichkeit`: Ich kann Figuren maßstabsgetreu vergrößern und verkleinern und ähnliche Figuren erkennen. Seiten `streckung`, `aehnliche-figuren`.
- `strahlensaetze`: Ich kann mit den Strahlensätzen Streckenlängen berechnen. Seiten `strahlensaetze`, `turmhoehe`.

Kapitel `dreieck` · Das rechtwinklige Dreieck
- `satz-des-pythagoras`: Ich kann mit dem Satz des Pythagoras und seiner Umkehrung Streckenlängen berechnen und rechte Winkel prüfen. Seiten `pythagoras-beweis`, `pythagoras-rechnen`.
- `trigonometrie`: Ich kann mit Sinus, Kosinus und Tangens Seiten und Winkel in rechtwinkligen Dreiecken berechnen. Seiten `verhaeltnisse`, `seiten-berechnen`, `winkel-berechnen`.
- `sinus-kosinussatz`: Ich kann mit Sinus- und Kosinussatz Seiten und Winkel in beliebigen Dreiecken berechnen. Seiten `sinussatz`, `kosinussatz`.

Je Kapitel eine Recap-Seite `recap` für Voraussetzungen von außen: Kapitel 1 `kongruenz`, `proportionale-zuordnungen`, `massstab`, `lineare-gleichungen` (dazu Begriffe Winkelmessen und Winkelsumme im Dreieck); Kapitel 2 `quadratwurzeln`, `flaeche-umfang-quadrat-rechteck`.

## Content structure

Jede Seite: `title`, `description`, `competencies: [<id>]`, Abschnitte mit festen ids `einstieg` („Was du hier lernst“ und erste Aufgabe), `idee` (Erklärung mit Bild), `beispiel` (Beispielkasten, Rechnung zeilenweise), `uebung`. Jede Seite endet mit einem Satz „Wie es weitergeht“. Recap-Seiten: `recap: [mathematik/<id>, …]`, ein Abschnitt je Baustein, nur beschreibende Blöcke plus Komponente `Kurztest`. Geschichte: Klasse 9 vermisst Schulhof, Turm und Fluss; erfundene, gemischte Namen, keine Marken. Höchstens 350 Wörter Lesetext je Seite.

## Terminology

Wörter der Karte. Dezimalkomma, `−` (U+2212), `·` und `:`, Einheit mit geschütztem Leerzeichen (`3 cm`), Winkel mit `∠` (kein `\angle`), griechische Buchstaben `\alpha` usw., Variablen kursiv, Brüche gesetzt. „du“. Glossar aus `definition`-Blöcken, jeder Begriff nur einmal im Explainer.

## Exercise patterns

- *Berechnen:* `generated`, Zufallszahlen mit festem Seed prüfbar, `compare.number` mit Einheit und Rundung, `mistakes` mit Grund (a + b = c, Wurzel vergessen, Gegen-/Ankathete vertauscht, Bogenmaß, sin⁻¹ als 1 : sin, plus statt mal, k statt k²).
- *Erkennen:* `single-choice`, `true-false`, `matching`; jede Option mit `info`.
- *Ablesen:* SVG-Figur im Text, Frage dazu.
- Beispiel: siehe `src/vergroessern/streckung.yaml`.

## Figures

Eigene SVG-Zeichnungen und Vue-Komponenten (Zugmodus: `Streckung`, `QuadrateUmlegen`, `WinkelRegler`), je mit `alt`, Beschriftung, Tastaturbedienung, `nojs`-Text und statischer Form. Farben nur über Variablen der Laufzeit, nie Farbe allein als Information. Quelle: eigene Zeichnung, CC0-1.0.

## Sources

Lernlandkarte Mathematik; eigene Herleitungen. Nachgeschlagenes (Satz des Pythagoras, Strahlensätze, Sinus-/Kosinussatz) wird selbst hergeleitet und nachgerechnet; keine Formulierungen, Aufgaben oder Bilder übernommen; keine externen Links; keine Dritt-Inhalte.

## Adding a chapter or round

1. Baustein in der Karte prüfen (`requires`); fehlende Voraussetzungen als Recap-Abschnitt.
2. Seiten als `src/<kapitel>/<seite>.yaml` anlegen, in `chapter.yaml` unter `pages`, Kapitel in `src/app.yaml` unter `chapters`.
3. Aufgaben nach den Mustern oben; mindestens drei je Baustein, steigend; Musterlösungen unabhängig nachrechnen.
4. `npx vp check --fix`, `npx --no -- lernapps check`, Commit.

## Rules learned from mistakes

- Keine `links:` an Aufgaben (Epic-Regel); `lernapps check` besteht ohne.
- Formeln: kein `\angle`, `\overline`, `\ldots`; Winkel mit ∠ im Text. Dezimalzahlen in `formula` mit `{,}`.
- Komponenten brauchen `min-width: 0` und Umbruch (360 px), `nojs`-Text mit Werten.

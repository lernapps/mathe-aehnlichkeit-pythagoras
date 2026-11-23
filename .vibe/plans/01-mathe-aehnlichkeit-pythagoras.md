---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: code
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: { app-content-guide: 1 }
---

# Plan: mathe-aehnlichkeit-pythagoras, first version

<!--
For you, the assistant. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Entry draft, Content method and Retrospective, in the
  creator's language. Delete the comment of a section once the section is filled.
- Work on the branch `work`, locally: push nothing before Commit.
-->

*Started 2026-11-23. Explore, Plan, Code, Commit.*

## Goal

Lernende der Klassen 9-10 erleben die zentrische Streckung und das rechtwinklige Dreieck als zwei tragende Bilder und
rechnen damit Strecken und Winkel aus (Ähnlichkeit, Strahlensätze, Satz des Pythagoras, Sinus/Kosinus/Tangens,
Sinus- und Kosinussatz). Auftrag: lernapps/apps#399, Schicht 3 des Mathe-Epics #402.

## Key decisions

- Archetyp `explainer`, Format 2, `strand: mathematik/geometrie`: Erklärseiten mit Bild, Beispiel und Aufgaben; Zugmodus
  (Schieberegler) nur als Vue-Komponente mit Tastatur, Textalternative und statischer Form.
- Die Auftraggeberin/der Auftraggeber ist hier der Orchestrator (Session 016Nmpwb…); das Issue 399 und die
  Epic-Regeln (`/tmp/epic/docs/mathe-epic/`) beantworten die Interviewthemen.
- Kapitel wie im Issue: 1 Vergrößern und verkleinern, 2 Das rechtwinklige Dreieck; je Kapitel eine Sammel-Wiederholung
  (`recap`) mit `Kurztest`-Komponente (regeln.md Abschnitt 7).
- Winkel mit Unicode ∠ (kein `\angle`), griechische Buchstaben als `\alpha` usw. (Fund W14).
- Keine `links:` an Aufgaben, keine Dritt-Inhalte, keine Videos (Regeln 4 und 9.6).
- Kein `scope` in `src/app.yaml`: keine `open-task`, kein eigenes Material des Auftraggebers.
- `links:` an Aufgaben weggelassen: `lernapps check` besteht ohne (Fund: Skill verlangt sie, Schema nicht; W4/W45).

## Notes

**Strang:** `mathematik/geometrie` (Raum und Form), Stufen 9-10. Karte `https://lernapps.net/apps/map/mathematik.json` gelesen.

**Kompetenzen nach Kapitel (Wortlaut der Karte):**

Kapitel 1 · Vergrößern und verkleinern
- `aehnlichkeit` (Schritt 1): Ich kann Figuren maßstabsgetreu vergrößern und verkleinern und ähnliche Figuren erkennen.
- `strahlensaetze` (Schritt 2): Ich kann mit den Strahlensätzen Streckenlängen berechnen.

Kapitel 2 · Das rechtwinklige Dreieck
- `satz-des-pythagoras` (Schritt 2): Ich kann mit dem Satz des Pythagoras und seiner Umkehrung Streckenlängen berechnen und rechte Winkel prüfen.
- `trigonometrie` (Schritt 3): Ich kann mit Sinus, Kosinus und Tangens Seiten und Winkel in rechtwinkligen Dreiecken berechnen.
- `sinus-kosinussatz` (Schritt 4): Ich kann mit Sinus- und Kosinussatz Seiten und Winkel in beliebigen Dreiecken berechnen.

**Voraussetzungen von außen (`requires` der Karte) → Sammel-Wiederholung:**
- Kapitel 1: `kongruenz`, `proportionale-zuordnungen`, `massstab` (für `aehnlichkeit`), `lineare-gleichungen` (für `strahlensaetze`).
- Kapitel 2: `quadratwurzeln`, `flaeche-umfang-quadrat-rechteck` (für `satz-des-pythagoras`). `trigonometrie` und `sinus-kosinussatz` brauchen nur Bausteine dieses Explainers.
- Karte-Funde: keine neuen. (Möglicher Hinweis: Winkelmessen/Winkelsumme im Dreieck wird vorausgesetzt, steht aber nicht in den `requires`; wird in der Seite kurz erklärt, nicht als Recap.)

**Didaktik:** zwei Bilder (Issue): zentrische Streckung mit Schieberegler; rechtwinkliges Dreieck mit Quadraten (Beweis durch Zerlegen) und Seitenverhältnissen. Vermessungsfälle (Turm und Schatten, Flussbreite, Rampe) verbinden beides. Abgrenzung: Körper und Vielecke berechnen → #429; Sinusfunktion → #396; Kongruenz und Konstruktionen → #430.

**Quellen:** Lernlandkarte Mathematik, KMK-Bildungsstandards Mathematik (2022), Hessisches Kerncurriculum Sek I; eigene Herleitungen und Aufgaben. Nachgeschlagene Fakten (Satz des Pythagoras, Strahlensätze, Sinus-/Kosinussatz) werden selbst hergeleitet und nachgerechnet; keine Texte, Aufgaben oder Bilder übernommen. Kerncurriculum/KMK: noch nicht im Wortlaut geöffnet (nicht geprüft; Reihenfolge gibt die Karte).

**Baustein → Seite (13 Seiten, 2 Kapitel):**

Kapitel `vergroessern` · Vergrößern und verkleinern
1. `recap`: Sammel-Wiederholung „Das brauchst du hier“ – `kongruenz`, `proportionale-zuordnungen`, `massstab`, `lineare-gleichungen` (je Abschnitt Fachbegriffe, Beispiel, `Kurztest`).
2. `streckung` – `aehnlichkeit`: Zentrische Streckung (Foto vergrößern, Schatten an der Wand; Zugmodus-Komponente).
3. `aehnliche-figuren` – `aehnlichkeit`: Ähnliche Figuren erkennen, Streckfaktor und Maßstab, Längen und Flächen.
4. `strahlensaetze` – `strahlensaetze`: Erster und zweiter Strahlensatz aus der Streckfigur ablesen und aufstellen.
5. `turmhoehe` – `strahlensaetze`: Anwendung: Turmhöhe mit dem Schatten, Flussbreite (Vermessung).

Kapitel `dreieck` · Das rechtwinklige Dreieck
6. `recap`: Sammel-Wiederholung – `quadratwurzeln`, `flaeche-umfang-quadrat-rechteck`.
7. `pythagoras-beweis` – `satz-des-pythagoras`: Quadrate umlegen (Zerlegen, Komponente), Satz formulieren.
8. `pythagoras-rechnen` – `satz-des-pythagoras`: Hypotenuse/Kathete berechnen, Umkehrung (rechter Winkel?), Anwendungen (Rampe, Diagonale).
9. `verhaeltnisse` – `trigonometrie`: Gleicher Winkel, gleiche Verhältnisse; Gegenkathete, Ankathete, Hypotenuse; sin, cos, tan (Komponente mit Winkelregler).
10. `seiten-berechnen` – `trigonometrie`: Seiten aus Winkel und Seite.
11. `winkel-berechnen` – `trigonometrie`: Winkel aus zwei Seiten (Umkehrfunktionen), Rampenneigung.
12. `sinussatz` – `sinus-kosinussatz`: Dreiecke ohne rechten Winkel, Sinussatz.
13. `kosinussatz` – `sinus-kosinussatz`: Kosinussatz, welcher Satz wann.

Prerequisites, die die App nicht übt: Seite 2-3: `kongruenz`, `massstab`, `proportionale-zuordnungen` (Recap 1); Seite 4-5: `lineare-gleichungen` (Recap 1); Seiten 7-8: `quadratwurzeln`, `flaeche-umfang-quadrat-rechteck` (Recap 6). Seiten 9-13 brauchen nur Bausteine dieser App (`aehnlichkeit`, `satz-des-pythagoras`, `trigonometrie`). Zusätzlich vorausgesetzt, aber nicht in `requires` der Karte: Winkel messen und Winkelsumme im Dreieck (kurz auf Seite 2 und 12 erklärt).

**Wie Lernende zum Ziel kommen (Herleitung statt Ablesen) und welcher Fehler die Rückmeldung fängt:**
- `aehnlichkeit`: Schieberegler streckt eine Figur vom Zentrum aus; sie lesen ab, dass Winkel bleiben und alle Längen mit demselben Faktor k wachsen. Fehler: Länge **plus** statt **mal** k; Flächen wachsen mit k (statt k²).
- `strahlensaetze`: aus der gestreckten Figur lesen sie Verhältnisse ab und stellen sie selbst auf. Fehler: Abschnitte auf demselben Strahl vs. Parallelen vertauscht; Teilstück statt Gesamtstrecke im Nenner.
- `satz-des-pythagoras`: Quadrate an den Seiten werden durch Zerlegen umgelegt (Beweis als Vorgang), dann a² + b² = c² rechnen; Umkehrung prüft rechte Winkel. Fehler: a + b = c; Wurzel vergessen; c nicht als längste Seite erkannt.
- `trigonometrie`: aus der Ähnlichkeit: gleicher Winkel ⇒ gleiche Seitenverhältnisse ⇒ sin, cos, tan; dann Seiten und Winkel berechnen. Fehler: Gegen-/Ankathete vertauscht, Taschenrechner im Bogenmaß, sin⁻¹ als 1 : sin.
- `sinus-kosinussatz`: Warum der rechtwinklige Fall nicht reicht (Höhe einzeichnen, Dreieck zerlegen), dann Sinus- und Kosinussatz anwenden. Fehler: falsches Seiten-Winkel-Paar zugeordnet; Kosinussatz ohne Wurzel/ohne −2bc·cos γ.

**Scope:** In: die fünf Bausteine; zentrische Streckung mit positivem Faktor (auch k < 1); Strahlensätze (V-/X-Figur, erster und zweiter Satz, ohne dritten Satz/Teilverhältnis-Beweise); Pythagoras mit Umkehrung und Anwendung (Diagonale, Höhe im gleichschenkligen Dreieck, Rampe); sin/cos/tan Grad; Sinus- und Kosinussatz (ohne den mehrdeutigen SSW-Fall als Rechenfall, nur Hinweis). Out: Körper und Vielecke berechnen (#429), Sinusfunktion und Bogenmaß (#396), Konstruktionen und Kongruenz (#430), negative Streckfaktoren. Sprache: Deutsch.

**Übungsmuster (Mathematik-Referenz):** berechnen = `generated` mit typischen Fehlern (Gegen-/Ankathete vertauscht, Taschenrechner im Bogenmaß, sin⁻¹ als 1 : sin, Wurzel vergessen, Katheten-Summe statt Quadrate); erkennen/begründen = `single-choice`, `true-false` mit Begründung; Figur ablesen = `image` (SVG) + Frage; Zugmodus = Vue-Komponente mit `nojs` und statischer Form.

## Explore

<!--
- Find out what the app teaches, for whom, how much and how it looks. Ask; write no code, run no `create`.
- An answer counts only in the creator's words under "Answers". At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Check the start: the folder `.agents/skills/lernapps-app` exists (else stop and tell the creator that the folder
      was not started with `init`), and `git branch --show-current` prints `work` (else `git switch -c work`).
- [x] Load skill `lernapps-app`. Tell the creator in two sentences what a lernapps app is and where it will live: at
      their own address, free and public, and once listed as a copy on lernapps.net. Say that the technical part
      (GitHub) comes at the end and that you do it.
- [x] Interview: ask the topics "Goal" and "Learners" of "Answers".
- [x] Load skill `lernapps-map-assignment` and read the learning map of the subject as it says. The creator brings
      the content themselves (material, a word list, the pages): note under "Notes" which competencies of the map it
      covers. Else write the skill's assignment, with its story; the creator's yes answers the topics Content and
      Amount. A subject without a map: skip this task and say so.
- [x] Load skill `lernapps-exercise-patterns` and read its reference for the subject. Note under "Notes" how learners
      will practise what the goal names.
- [x] Choose the archetype as skill `lernapps-app` says: read the README of each archetype in question, then tell the
      creator in plain words what the chosen one can and cannot do. Write the archetype and its reason under "Key
      decisions".
- [x] Run `npx --no -- lernapps skills --archetype <name>` with the chosen archetype. It installs the archetype's
      skills and adds the archetype's tasks to this plan.
- [x] Load skill `lernapps-explainer-design`. An explainer has the look of the runtime: write "fixed by the
      archetype" under the topic "Look and feel" of "Answers".
- [x] Interview: ask every other topic of "Answers", in order. Leave out only a topic that an answer of the creator
      already covers, and note which answer. A topic nobody answered is asked once before you write an assumption
      with "(guess)".
- [x] Load skill `lernapps-content-research` and research as it says. Write under "Notes": the strand or subject, the
      competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" which competency goes on which page and which pages form a chapter, as "Map the content" of
      skill `lernapps-explainer-design` says. Per page, name the prerequisites the app does not practise.
- [x] Write under "Notes", one line per competency: how learners get there (they derive it, they do not only read it
      off), and which misconception the feedback catches.
- [x] Write under "Notes" the scope: what is in, what is out and why, the data range (for example "all main-group
      elements", never a silent "1–20"), the languages.
- [x] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.
      Creator: Recherche freigegeben, weiter mit dem Plan (Orchestrator). Winkelsumme/Winkelmessen im Recap kurz als Begriffe erklären; Musterseite streckung.

### Answers

<!-- The interview: per topic the creator's answer, in their words. Keep the topics. -->

- Goal: „Ich verstehe, dass vergrößerte Figuren dieselben Winkel und Verhältnisse haben und dass das rechtwinklige Dreieck Längen und Winkel verbindet, und kann damit Strecken und Winkel bestimmen.“ (Issue #399)
- Learners: Mathematik, Klassen 9-10; Vorwissen laut `requires` der Karte (Kongruenz, Maßstab, proportionale Zuordnungen, lineare Gleichungen, Quadratwurzeln, Fläche von Quadrat und Rechteck), wiederholt in Sammel-Wiederholungen.
- Model and focus: Vorbild sind die Mathe-Explainer des Epics (z. B. #430); Schwerpunkt: zwei Bilder (Streckung mit Schieberegler, Dreieck mit Quadraten und Verhältnissen), Aufgaben mit inhaltlicher Rückmeldung.
- Hurdles: Streckfaktor und Flächenfaktor verwechseln; Strahlensatz-Verhältnisse falsch zugeordnet; im Pythagoras Katheten statt Quadrate addieren; Hypotenuse nicht erkannt; Gegen-/Ankathete vertauscht; Taschenrechner im Bogenmaß; sin⁻¹ als 1 : sin.
- Content: schreibe ich selbst aus der Karte und eigenen Herleitungen (Regeln, Abschnitt 4); kein eigenes Material des Auftraggebers.
- Amount: 2 Kapitel, 5 Bausteine, je Baustein mindestens 3 Aufgaben, 2 Sammel-Wiederholungen; Kreis/Körper → #429, Sinusfunktion → #396.
- Languages: nur Deutsch (Epic-Vorgabe; (guess), nicht ausdrücklich genannt).
- Look and feel: fixed by the archetype (ruhig wie ein Arbeitsblatt, Dunkelmodus folgt dem Gerät); kein Punktestand, keine Rangliste, kein Zeitdruck (Regeln 3.2).
- Terms: Wörter der Karte (Ähnlichkeit, Strahlensätze, Satz des Pythagoras, Trigonometrie im rechtwinkligen Dreieck, Sinussatz und Kosinussatz); Schreibweisen nach regeln.md Abschnitt 2; Winkel mit ∠.
- Finding the app: Ähnlichkeit, Strahlensätze, Satz des Pythagoras, Sinus Kosinus Tangens, Sinussatz, Kosinussatz, Klasse 9 10.

## Plan

<!--
- Map the confirmed content onto the archetype. No new content questions: a gap in the content goes back to Explore.
- The creator confirms the plan in one read. After the yes you work on your own.
-->

### Tasks

- [x] Map the content as "Map the content" of skill `lernapps-explainer-design` says, and write the result under
      "Content method".
- [x] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [x] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [x] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [x] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [x] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [x] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.
      Creator: Plan bestätigt, ja (Orchestrator).

### Content method

<!-- One line each: the patterns and where; the figures and how they are made; the data files; each component, what it
checks and what it cannot; how a later agent adds a chapter. It becomes the content guide in Code. -->
<!-- An explainer: per figure, model and component its learning action in two to four sentences
(`explainer-representation-explained`); per page its prerequisites the app does not practise, and which get a recap
page, which a link. -->

**Seitenaufbau:** feste Abschnitts-ids `einstieg`, `idee`, `beispiel`, `uebung` (Titel sagen, was der Abschnitt tut; „Ausprobieren“ nur über einer Bedienung). Jede Seite beginnt mit „Was du hier lernst“ (regeln 9.1) und endet mit „Wie es weitergeht“. Aufgaben: erkennen (single-choice/true-false mit Grund) → anwenden (`generated`, Zahlen gezogen, typische Fehler mit Meldung) → neue Situation (Sachaufgabe, Umkehrfrage). Mindestens 3 Aufgaben je Baustein, die erste ohne Vorwissen aus dem Kapitel lösbar. Schreibweisen nach regeln.md Abschnitt 2 (Komma, −, ·, :, ∠, Einheiten mit geschütztem Leerzeichen).

**Muster:**
- *Berechnen mit Rechenprobe:* `generated` (Ausdruck, `compare.number` mit Einheit und Rundung, `mistakes` mit Grund). Fehler: Pythagoras a + b = c bzw. Wurzel vergessen; Trigonometrie Gegen-/Ankathete, Bogenmaß, sin⁻¹ als 1 : sin; Strahlensatz Verhältnis vertauscht; Streckung plus statt mal; Fläche mal k statt k². Rechenprobe: Seed-Test der Laufzeit plus ein unabhängiges Skript im Scratchpad (nicht im Repo), das die Musterlösungen nachrechnet.
- *Erkennen/Begründen:* `single-choice`, `true-false`, `matching`; jede Option mit `info`.
- *Ablesen:* statische SVG-Figur (`image`) mit Text und Frage zur Figur.
- *Zugmodus:* Vue-Komponenten, je mit Tastatur (`input type=range`, Pfeiltasten), `nojs` mit Werten für drei Stellungen und statischer Form (Bild der Stellungen). `Streckung` (Regler k, Zentrum Z, Dreieck ABC → A′B′C′, zeigt Längen, Winkel, Flächenverhältnis), `QuadrateUmlegen` (Schritt-für-Schritt-Knopf: Katheten-Quadrate werden in das Hypotenusen-Quadrat zerlegt), `WinkelRegler` (Winkel α ändern, Verhältnisse Gegenkathete : Hypotenuse usw. bleiben bei gleichem Winkel gleich). Grund: kein Block zeigt eine vom Lernenden veränderte Figur (`prefer-built-in-block`).
- *Kurztest* (Recap): Vorlage aus `docs/mathe-epic/components/` (mit W42-Korrektur) nach `src/components/`.
- *Figuren:* alle selbst als SVG, `alt` und Beschriftung; „eigene Zeichnung, CC0“.

**Engagement je Seite:**
- Geschichte (Klasse 9-10, Situation in Nachrichten): eine Klasse vermisst Schulhof, Turm und Fluss; erfundene, gemischte Namen. Jede Seite nimmt den Fall der Seite davor auf.
- 1 `recap` K1: Eröffnung „Kannst du das?“ je Baustein; Begriffe Winkelmessen und Winkelsumme im Dreieck zusätzlich (Hinweis Orchestrator).
- 2 `streckung`: Eröffnung Schatten einer Lampe an der Wand („Was passiert mit dem Schatten, wenn die Lampe näher kommt?“); Regler; Belohnung: sie sagen k aus zwei Längen.
- 3 `aehnliche-figuren`: ähnlich oder nicht (Rechtecke, Dreiecke), Faktor k, Flächen mal k².
- 4 `strahlensaetze`: V-Figur aus der Streckfigur; Verhältnisse selbst aufstellen.
- 5 `turmhoehe`: Turm und Schatten, Flussbreite; Rechenweg in Schritten.
- 6 `recap` K2: Quadratwurzeln, Fläche und Umfang.
- 7 `pythagoras-beweis`: Quadrate umlegen als Vorgang, Satz in Worten.
- 8 `pythagoras-rechnen`: Hypotenuse, Kathete, Umkehrung (3-4-5), Rampe/Diagonale.
- 9 `verhaeltnisse`: gleicher Winkel, gleiche Verhältnisse; Winkelregler; Seiten vom Winkel aus benennen.
- 10 `seiten-berechnen`, 11 `winkel-berechnen`: Rechenpfade, Rampenneigung, Taschenrechner auf DEG.
- 12 `sinussatz`, 13 `kosinussatz`: Höhe einzeichnen als Herleitung; Wahl des Satzes (matching). Rückblick „Das kannst du jetzt“ am Ende.

**Recap (regeln 7):** Je Baustein eigener Abschnitt, fette Begriffe mit Beispiel und Zahlen, ein bis zwei `Kurztest` (nicht zu leicht), Satz mit Name und Kartenseite des Bausteins als Text, Kopf „Das brauchst du für dieses Kapitel“, Schluss Checkliste „Du bist bereit, wenn du …“. Begriffe auch im Glossar (`definition`, je Begriff nur einmal, W34).

**Prerequisites je Seite:** siehe „Baustein → Seite“ unter Notes.

**Review:**
- Lernenden-Prüfer (Unteragent, Klasse 9-10) auf der Musterseite `streckung`: unklare Sätze (Verhältnis der Abstände, „verschiebt“, k = 1), Regler nur 0,5er-Schritte, Beschriftungen A/A′ überlagern, Aufgaben zu leicht, Zentrum nie nachgerechnet, kein Schlusskasten. Umgesetzt: Sätze neu, Regler 0,5 bis 2,5 in 0,1, Abstand Z–A in der Tabelle, Beschriftung versetzt, Aufgabe mit Abständen zu Z (zweistufig), Winkelaufgabe als `generated` mit Fehlerhinweis, Fehlertyp-Frage statt true-false, Schlusskasten „Das kannst du jetzt“. Nach dem Lauf geändert: nur diese Umsetzung (noch nicht erneut geprüft).
- Laufzeit-Funde (nicht behoben): Zahlenfeld lehnt „50°“, „5 cm“ ab mit „Antworte zuerst“ (W6/W11/W20); Aufgabennummer beginnt zufällig (W12); Standardrückmeldung „Lies dazu noch einmal den Text“ bei Wahr/Falsch (W13); Skill verlangt `links` je Frage, Schema nicht (W4/W45).

## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [x] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [x] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [x] Load skill `lernapps-explainer`.
- [x] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [x] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [x] Musterseite streckung (Kapitel 1, Seite 2): Komponente Streckung (Regler, Tastatur, nojs, Test), Einstieg, Idee, Beispiel, Aufgaben (erkennen, generated, Sachaufgabe); Lernenden-Prüfer (Klasse 9-10) spielt sie durch; app.yaml, chapter.yaml, Gerüst
<!-- tasks: pattern (1 added): the one page or screen that is the pattern for the others -->
- [x] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
      Creator: Musterseite angenommen, übrige Seiten dürfen dem Muster folgen (Orchestrator).
- [ ] Kapitel 1 Recap: Seite recap mit Kurztest-Komponente (Kopie der Vorlage), Abschnitte Kongruenz, Proportionale Zuordnungen, Maßstab, Lineare Gleichungen, Winkelmessen und Winkelsumme; Glossar; Push
- [ ] Kapitel 1: Seite aehnliche-figuren (ähnlich erkennen, Faktor k, Maßstab, Flächen mal k²) mit Aufgaben
- [ ] Kapitel 1: Seite strahlensaetze (V- und X-Figur, erster und zweiter Strahlensatz) mit Aufgaben
- [ ] Kapitel 1: Seite turmhoehe (Turm und Schatten, Flussbreite) mit Aufgaben; Push von Kapitel 1
- [ ] Kapitel 2 Recap: Seite recap mit Quadratwurzeln und Fläche und Umfang: Rechteck, Quadrat, je mit Kurztest
- [ ] Kapitel 2: Seite pythagoras-beweis mit Komponente QuadrateUmlegen und Aufgaben
- [ ] Kapitel 2: Seite pythagoras-rechnen (Hypotenuse, Kathete, Umkehrung, Anwendungen) mit Aufgaben
- [ ] Kapitel 2: Seite verhaeltnisse mit Komponente WinkelRegler (sin, cos, tan) und Aufgaben
- [ ] Kapitel 2: Seiten seiten-berechnen und winkel-berechnen (Trigonometrie) mit Aufgaben
- [ ] Kapitel 2: Seiten sinussatz und kosinussatz mit Aufgaben; Push von Kapitel 2
- [ ] Prüfer: Lernenden-Prüfer und fachlicher Prüfer (Unteragenten) über alle Seiten; Befunde unter Review; Änderungen danach festhalten
<!-- tasks: pages (11 added): the other pages or screens, after the pattern -->
- [ ] Update the content guide so that it describes the app as built (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [ ] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

- [ ] Load skill `lernapps-explainer-self-assessment`. Add the self-assessment as it says, or write under "Key
      decisions" why the app has none. Commit.
- [ ] Load skill `lernapps-github`. Set up the repository and Pages as it says. Ask for the repository's name and
      every click only the creator can make, in one message.
- [ ] Push `work`, open the preview pull request and see its checks to green, as skill `lernapps-github` says.
- [ ] **Checkpoint:** publish. Show what the app does and the preview link from the comment "Vorschau der App". Ask
      whether it may go online. Stop and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: `work` into `main` as one squash commit,
      the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm that the app shows. Never use a derived address.
- [ ] Load skill `lernapps-listing`. Write the entry under "Entry draft" as it says, with the creator's answer to
      "Finding the app".
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it: the listing check and the review read it there.
- [ ] **Checkpoint:** list. Open the listing pull request as skill `lernapps-listing` says, without asking first: the
      pull request is the review. See it to "bestanden", then show the creator the pull request and its result.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

### Entry draft

<!-- YAML valid against the entry schema the listing skill names. Only known values, never invented. -->

```yaml
```

## Retrospective

<!-- At the end of Commit, before the listing pull request. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, messages or answers, and your choice. "None" if none. -->

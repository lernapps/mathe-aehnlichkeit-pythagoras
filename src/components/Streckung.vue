<script setup lang="ts">
// The stretching figure: the learner moves a slider for the factor k and sees the triangle ABC stretched from the centre Z
// to A′B′C′, with lengths, the angle at A. Keyboard: the arrow keys of the slider.
import { computed, ref } from "vue";
import { describeState, original, readout, snap, stretchTriangle, type Point } from "./Streckung.ts";

const k = ref(1);
const unit = 13;
const origin = { x: 30, y: 255 };
const toPx = (p: Point) => ({ x: origin.x + p.x * unit, y: origin.y - p.y * unit });
const pts = (t: { A: Point; B: Point; C: Point }) =>
  [t.A, t.B, t.C]
    .map(toPx)
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

const rightAngle = computed(() =>
  [
    { x: original.A.x + 0.7, y: original.A.y },
    { x: original.A.x + 0.7, y: original.A.y + 0.7 },
    { x: original.A.x, y: original.A.y + 0.7 },
  ]
    .map(toPx)
    .map((q) => `${q.x},${q.y}`)
    .join(" "),
);
const image = computed(() => stretchTriangle(original, k.value));
const r = computed(() => readout(k.value));
const summary = computed(() => describeState(k.value));
const px = computed(() => ({
  a: toPx(original.A),
  b: toPx(original.B),
  c: toPx(original.C),
  a2: toPx(image.value.A),
  b2: toPx(image.value.B),
  c2: toPx(image.value.C),
}));

function onInput(e: Event) {
  k.value = snap(Number((e.target as HTMLInputElement).value));
}
</script>

<template>
  <div class="streckung">
    <svg viewBox="0 0 320 280" role="img" :aria-label="summary" class="streckung-svg">
      <line :x1="origin.x" :y1="origin.y" :x2="px.a2.x" :y2="px.a2.y" class="ray" />
      <line :x1="origin.x" :y1="origin.y" :x2="px.b2.x" :y2="px.b2.y" class="ray" />
      <line :x1="origin.x" :y1="origin.y" :x2="px.c2.x" :y2="px.c2.y" class="ray" />
      <polygon :points="pts(image)" class="image" />
      <polygon :points="pts(original)" class="orig" />
      <polyline :points="rightAngle" class="rechts" />
      <circle :cx="origin.x" :cy="origin.y" r="3.5" class="dot" />
      <text :x="origin.x - 14" :y="origin.y + 14" class="lab">Z</text>
      <text :x="px.a.x - 16" :y="px.a.y + 16" class="lab">A</text>
      <text :x="px.b.x + 4" :y="px.b.y + 14" class="lab">B</text>
      <text :x="px.c.x - 16" :y="px.c.y" class="lab">C</text>
      <text :x="px.a2.x + 6" :y="px.a2.y - 8" class="lab2">A′</text>
      <text :x="px.b2.x + 6" :y="px.b2.y - 8" class="lab2">B′</text>
      <text :x="px.c2.x + 6" :y="px.c2.y + 4" class="lab2">C′</text>
    </svg>

    <div class="controls">
      <label for="streckung-k"
        >Streckfaktor <i>k</i>: <output for="streckung-k">{{ r.k }}</output></label
      >
      <input
        id="streckung-k"
        type="range"
        min="0.5"
        max="2.5"
        step="0.1"
        :value="k"
        aria-describedby="streckung-live"
        @input="onInput"
      />
      <button type="button" class="reset" @click="k = 1">Zurück auf k = 1</button>
    </div>

    <table class="values">
      <caption>
        Vorher und nachher
      </caption>
      <thead>
        <tr>
          <th scope="col">Größe</th>
          <th scope="col">Dreieck ABC</th>
          <th scope="col">Bild A′B′C′</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Abstand von Z zu A</th>
          <td>{{ r.za }} cm</td>
          <td>{{ r.zaImage }} cm</td>
        </tr>
        <tr>
          <th scope="row">Länge AB</th>
          <td>{{ r.ab }} cm</td>
          <td>{{ r.abImage }} cm</td>
        </tr>
        <tr>
          <th scope="row">Länge AC</th>
          <td>{{ r.ac }} cm</td>
          <td>{{ r.acImage }} cm</td>
        </tr>
        <tr>
          <th scope="row">Länge BC</th>
          <td>{{ r.bc }} cm</td>
          <td>{{ r.bcImage }} cm</td>
        </tr>
        <tr>
          <th scope="row">Winkel bei A</th>
          <td>{{ r.angleA }}°</td>
          <td>{{ r.angleAImage }}°</td>
        </tr>
      </tbody>
    </table>
    <p id="streckung-live" class="sr" aria-live="polite">{{ summary }}</p>
  </div>
</template>

<style scoped>
.streckung {
  margin: 1rem 0;
  max-width: 100%;
  box-sizing: border-box;
}
.streckung-svg {
  width: 100%;
  max-width: 28rem;
  height: auto;
  display: block;
  border: 1px solid var(--page-border);
  border-radius: 0.4rem;
  background: var(--page-surface);
}
.orig {
  fill: none;
  stroke: var(--page-text);
  stroke-width: 2.5;
}
.image {
  fill: none;
  stroke: var(--page-accent);
  stroke-width: 2.5;
  stroke-dasharray: 7 4;
}
.ray {
  stroke: var(--page-muted);
  stroke-width: 1;
}
.rechts {
  fill: none;
  stroke: var(--page-text);
  stroke-width: 1.5;
}
.dot {
  fill: var(--page-text);
}
.lab,
.lab2 {
  font-size: 14px;
  fill: var(--page-text);
}
.lab2 {
  font-weight: 700;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  margin: 0.75rem 0;
}
.controls input[type="range"] {
  flex: 1 1 10rem;
  min-height: 44px;
  min-width: 0;
  max-width: calc(100% - 8px);
  margin: 0 4px;
}
.reset {
  min-height: 44px;
  padding: 0 0.9rem;
  border: 1px solid var(--page-border);
  border-radius: 0.4rem;
  background: var(--page-surface);
  color: var(--page-text);
  font: inherit;
}
.values {
  border-collapse: collapse;
  width: 100%;
  max-width: 28rem;
}
.values caption {
  text-align: left;
  font-weight: 600;
  padding-bottom: 0.25rem;
}
.values th,
.values td {
  border: 1px solid var(--page-border);
  padding: 0.3rem 0.5rem;
  text-align: left;
}
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>

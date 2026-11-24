<script setup lang="ts">
// The angle slider: the learner sets the angle α and the size of a right triangle and watches which numbers change and which
// stay the same. Keyboard: the arrow keys of the two sliders.
import { computed, ref } from "vue";
import {
  alphaMax,
  alphaMin,
  clampInt,
  corners,
  describeState,
  fmt,
  ratios,
  sides,
  sizeMax,
  sizeMin,
} from "./WinkelRegler.ts";

const alpha = ref(30);
const size = ref(8);

const unit = 22;
const origin = { x: 20, y: 232 };
const toPx = (p: { x: number; y: number }) => ({ x: origin.x + p.x * unit, y: origin.y - p.y * unit });
const c = computed(() => corners(alpha.value, size.value));
const px = computed(() => ({ a: toPx(c.value.A), b: toPx(c.value.B), c: toPx(c.value.C) }));
const s = computed(() => sides(alpha.value, size.value));
const r = computed(() => ratios(alpha.value, size.value));
const summary = computed(() => describeState(alpha.value, size.value));
const arc = computed(() => {
  const rad = (alpha.value * Math.PI) / 180;
  const rr = Math.max(14, Math.min(30, s.value.adjacent * unit * 0.8));
  return `M ${origin.x + rr},${origin.y} A ${rr},${rr} 0 0 0 ${origin.x + rr * Math.cos(rad)},${origin.y - rr * Math.sin(rad)}`;
});
const square = computed(() => {
  const q = 10;
  const cx = px.value.c.x;
  const cy = px.value.c.y;
  return `${cx - q},${cy} ${cx - q},${cy - q} ${cx},${cy - q}`;
});

function setAlpha(e: Event) {
  alpha.value = clampInt(Number((e.target as HTMLInputElement).value), alphaMin, alphaMax);
}
function setSize(e: Event) {
  size.value = clampInt(Number((e.target as HTMLInputElement).value), sizeMin, sizeMax);
}
</script>

<template>
  <div class="winkel">
    <svg viewBox="0 0 320 272" role="img" :aria-label="summary" class="winkel-svg">
      <polygon :points="`${px.a.x},${px.a.y} ${px.c.x},${px.c.y} ${px.b.x},${px.b.y}`" class="tri" />
      <polyline :points="square" class="rechts" />
      <path :d="arc" class="bogen" />
      <text :x="origin.x + Math.max(18, Math.min(36, s.adjacent * unit * 0.8 + 6))" :y="origin.y - 6" class="lab">
        α
      </text>
      <text :x="origin.x - 14" :y="origin.y + 16" class="lab">A</text>
      <text :x="px.c.x + 4" :y="px.c.y + 16" class="lab">C</text>
      <text :x="px.b.x + 4" :y="px.b.y - 4" class="lab">B</text>
      <text :x="px.c.x + 6" :y="(px.c.y + px.b.y) / 2 + 4" class="side">Gegenkathete</text>
      <text :x="(px.a.x + px.c.x) / 2 - 24" :y="px.a.y + 30" class="side">Ankathete</text>
      <text :x="Math.max(4, (px.a.x + px.b.x) / 2 - 62)" :y="(px.a.y + px.b.y) / 2 - 12" class="side">Hypotenuse</text>
    </svg>

    <div class="controls">
      <label for="winkel-alpha">Winkel <i>α</i>: {{ alpha }}°</label>
      <input id="winkel-alpha" type="range" :min="alphaMin" :max="alphaMax" step="1" :value="alpha" @input="setAlpha" />
      <label for="winkel-size">Hypotenuse: {{ size }} cm</label>
      <input id="winkel-size" type="range" :min="sizeMin" :max="sizeMax" step="1" :value="size" @input="setSize" />
    </div>

    <table class="values">
      <caption>
        Seiten und Verhältnisse
      </caption>
      <thead>
        <tr>
          <th scope="col">Größe</th>
          <th scope="col">Wert</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Gegenkathete</th>
          <td>{{ fmt(s.opposite, 2) }} cm</td>
        </tr>
        <tr>
          <th scope="row">Ankathete</th>
          <td>{{ fmt(s.adjacent, 2) }} cm</td>
        </tr>
        <tr>
          <th scope="row">Gegenkathete : Hypotenuse</th>
          <td>{{ r.sin }}</td>
        </tr>
        <tr>
          <th scope="row">Ankathete : Hypotenuse</th>
          <td>{{ r.cos }}</td>
        </tr>
        <tr>
          <th scope="row">Gegenkathete : Ankathete</th>
          <td>{{ r.tan }}</td>
        </tr>
      </tbody>
    </table>
    <p class="sr" aria-live="polite">{{ summary }}</p>
  </div>
</template>

<style scoped>
.winkel {
  margin: 1rem 0;
  max-width: 100%;
  box-sizing: border-box;
}
.winkel-svg {
  width: 100%;
  max-width: 28rem;
  height: auto;
  display: block;
  border: 1px solid var(--page-border);
  border-radius: 0.4rem;
  background: #ffffff;
}
.tri {
  fill: #e8f0ff;
  stroke: #1a1a1a;
  stroke-width: 2.5;
}
.rechts,
.bogen {
  fill: none;
  stroke: #1a1a1a;
  stroke-width: 1.5;
}
.lab {
  font-size: 15px;
  fill: #1a1a1a;
}
.side {
  font-size: 12px;
  font-weight: 700;
  fill: #1a1a1a;
}
.controls {
  display: grid;
  gap: 0.25rem;
  margin: 0.75rem 0;
}
.controls input[type="range"] {
  min-height: 44px;
  min-width: 0;
  max-width: calc(100% - 8px);
  margin: 0 4px;
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

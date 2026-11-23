<script setup lang="ts">
// The proof by rearranging: the learner sets the legs a and b, then steps through three views with the buttons: the large
// square with four triangles and the square over c, the same triangles laid differently, and both side by side.
import { computed, ref } from "vue";
import { describeStep, first, second, steps, type Arrangement, type Polygon } from "./QuadrateUmlegen.ts";

const a = ref(3);
const b = ref(4);
const step = ref(1);

const size = 288;
const unit = computed(() => size / (a.value + b.value));
const pts = (poly: Polygon) => poly.map((q) => `${6 + q.x * unit.value},${6 + size - q.y * unit.value}`).join(" ");
const center = (poly: Polygon) => ({
  x: 6 + (poly.reduce((s, q) => s + q.x, 0) / poly.length) * unit.value,
  y: 6 + size - (poly.reduce((s, q) => s + q.y, 0) / poly.length) * unit.value,
});

const views = computed<{ title: string; arr: Arrangement }[]>(() => {
  const one = { title: "Anordnung 1: Quadrat über c", arr: first(a.value, b.value) };
  const two = { title: "Anordnung 2: Quadrate über a und b", arr: second(a.value, b.value) };
  return step.value === 1 ? [one] : step.value === 2 ? [two] : [one, two];
});
const text = computed(() => describeStep(step.value, a.value, b.value));
const fills: Record<string, string> = { a: "#cfe3ff", b: "#d4f0d0", c: "#ffe0b3" };
</script>

<template>
  <div class="umlegen">
    <div class="legs">
      <label for="umlegen-a">Kathete <i>a</i>: {{ a }} cm</label>
      <input id="umlegen-a" v-model.number="a" type="range" min="1" max="6" step="1" />
      <label for="umlegen-b">Kathete <i>b</i>: {{ b }} cm</label>
      <input id="umlegen-b" v-model.number="b" type="range" min="1" max="6" step="1" />
    </div>

    <p class="stepno">Schritt {{ step }} von {{ steps }}</p>
    <div class="views" :class="{ two: views.length === 2 }">
      <figure v-for="v in views" :key="v.title" class="view">
        <svg viewBox="0 0 300 300" role="img" :aria-label="v.title + '. ' + text">
          <rect width="300" height="300" fill="#ffffff" />
          <polygon
            v-for="(sq, i) in v.arr.squares"
            :key="'s' + i"
            :points="pts(sq.polygon)"
            :fill="fills[sq.name]"
            stroke="#1a1a1a"
            stroke-width="2"
          />
          <polygon
            v-for="(t, i) in v.arr.triangles"
            :key="'t' + i"
            :points="pts(t)"
            fill="#e6e6e6"
            stroke="#1a1a1a"
            stroke-width="2"
            stroke-dasharray="6 3"
          />
          <text
            v-for="(t, i) in v.arr.triangles"
            :key="'n' + i"
            :x="center(t).x"
            :y="center(t).y + 5"
            text-anchor="middle"
            class="num"
          >
            {{ i + 1 }}
          </text>
          <text
            v-for="(sq, i) in v.arr.squares"
            :key="'l' + i"
            :x="center(sq.polygon).x"
            :y="center(sq.polygon).y + 7"
            text-anchor="middle"
            class="sq"
          >
            {{ sq.name }}²
          </text>
        </svg>
        <figcaption>
          {{ v.title }}. Grau gestrichelt: die vier Dreiecke 1 bis 4. Orange: Quadrat über c, blau: über a, grün: über
          b.
        </figcaption>
      </figure>
    </div>
    <p class="text" aria-live="polite">{{ text }}</p>

    <div class="buttons">
      <button type="button" :disabled="step === 1" @click="step--">Zurück</button>
      <button type="button" :disabled="step === steps" @click="step++">Nächster Schritt</button>
      <button type="button" :disabled="step === 1" @click="step = 1">Von vorn</button>
    </div>
  </div>
</template>

<style scoped>
.umlegen {
  margin: 1rem 0;
  max-width: 100%;
  box-sizing: border-box;
}
.legs {
  display: grid;
  gap: 0.25rem;
}
.legs input[type="range"] {
  min-height: 44px;
  min-width: 0;
  max-width: calc(100% - 8px);
  margin: 0 4px;
}
.stepno {
  font-weight: 600;
  margin: 0.75rem 0 0.25rem;
}
.views {
  display: grid;
  gap: 0.75rem;
}
.views.two {
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}
.view {
  margin: 0;
  min-width: 0;
}
.view svg {
  width: 100%;
  max-width: 24rem;
  height: auto;
  display: block;
  border: 1px solid var(--page-border);
  border-radius: 0.4rem;
}
.view figcaption {
  font-size: 0.9rem;
  color: var(--page-muted);
  margin-top: 0.25rem;
}
.num {
  font-size: 16px;
  font-weight: 700;
  fill: #1a1a1a;
}
.sq {
  font-size: 22px;
  font-weight: 700;
  fill: #1a1a1a;
}
.text {
  margin: 0.5rem 0;
  overflow-wrap: anywhere;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.buttons button {
  min-height: 44px;
  padding: 0 0.9rem;
  border: 1px solid var(--page-border);
  border-radius: 0.4rem;
  background: var(--page-surface);
  color: var(--page-text);
  font: inherit;
}
.buttons button:disabled {
  opacity: 0.55;
}
</style>

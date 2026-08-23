import type { Tank } from './tank';

const SPACING = 32;
const MIN_HEIGHT = 4;
const HEIGHT_RANGE = 30;

function createStalk(tank: Tank, x: number) {
  const div = document.createElement("div");
  div.classList.add("seaweed");
  div.style.left = `${x}px`;
  div.style.setProperty("--sway-duration", `${3 + Math.random() * 2}s`);
  div.textContent = "/".repeat(MIN_HEIGHT + Math.floor(Math.random() * HEIGHT_RANGE));
  tank.add(div);
  return div;
}

// Fixed spacing rather than a fixed count, so stalk i always sits at the same x.
// Resizing then only appends to or trims the tail; existing stalks never shift or re-roll.
export function createSeaweedBed(tank: Tank) {
  const stalks: HTMLElement[] = [];

  function sync() {
    const target = Math.ceil(tank.width / SPACING);

    while (stalks.length > target) stalks.pop()!.remove();

    while (stalks.length < target) {
      const x = stalks.length * SPACING + (Math.random() - 0.5) * SPACING;
      stalks.push(createStalk(tank, x));
    }
  }

  sync();
  addEventListener("resize", sync);
}

const GROUP_SIZE = 6;
const REPEATS = 20;

export function createRipple(tank: HTMLElement) {
  const outer = document.createElement("div");
  outer.classList.add("ripple");

  const inner = document.createElement("div");
  inner.classList.add("ripple-inner");

  const wave = "~".repeat(GROUP_SIZE) + " ".repeat(GROUP_SIZE);
  const gap = " ".repeat(GROUP_SIZE) + "~".repeat(GROUP_SIZE);
  const topRow = wave.repeat(REPEATS);
  const bottomRow = gap.repeat(REPEATS);
  inner.textContent = [topRow, bottomRow].map(line => line + line).join("\n");

  outer.appendChild(inner);
  tank.appendChild(outer);
}

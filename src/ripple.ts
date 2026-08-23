const GROUP_SIZE = 6;
const REPEATS = 20;

export function createRipple(tank: HTMLElement) {
  const outer = document.createElement("div");
  outer.classList.add("ripple");

  // Two rows of tildes, offset so they interleave into a zigzag. CSS stacks them on
  // one baseline and bobs them in opposite phase, so the crest and trough trade places.
  for (const offset of [0, GROUP_SIZE]) {
    const row = document.createElement("div");
    row.classList.add("ripple-row");

    const pattern = " ".repeat(offset) + "~".repeat(GROUP_SIZE) + " ".repeat(GROUP_SIZE - offset);
    const line = pattern.repeat(REPEATS);
    row.textContent = line + line;

    outer.appendChild(row);
  }

  tank.appendChild(outer);
}

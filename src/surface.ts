const GROUP_SIZE = 6;

const pattern = (offset: number) =>
  " ".repeat(offset) + "~".repeat(GROUP_SIZE) + " ".repeat(GROUP_SIZE - offset);

export function createRipple(tank: HTMLElement) {
  const outer = document.createElement("div");
  outer.classList.add("ripple");
  tank.appendChild(outer);

  // Two rows of tildes, offset so they interleave into a zigzag. CSS stacks them on
  // one baseline and bobs them in opposite phase, so the crest and trough trade places.
  const rows = [0, GROUP_SIZE].map(offset => {
    const row = document.createElement("div");
    row.classList.add("ripple-row");
    outer.appendChild(row);
    return { row, offset };
  });

  // The scroll animation slides each row left by half its own width, so half a row has
  // to cover the tank or a gap scrolls through. Measure one tile and tile to fit rather
  // than guessing a repeat count that only holds at typical aspect ratios.
  function sync() {
    const probe = rows[0].row;
    probe.textContent = pattern(0);
    const tileWidth = probe.offsetWidth;
    if (!tileWidth) return;

    const repeats = Math.ceil(tank.clientWidth / tileWidth) + 1;
    for (const { row, offset } of rows) {
      const line = pattern(offset).repeat(repeats);
      row.textContent = line + line;
    }
  }

  sync();
  addEventListener("resize", sync);

  return outer;
}

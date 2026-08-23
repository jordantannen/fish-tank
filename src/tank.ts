const GROUP_SIZE = 6;

const pattern = (offset: number) =>
  " ".repeat(offset) + "~".repeat(GROUP_SIZE) + " ".repeat(GROUP_SIZE - offset);

// The water volume everything else lives in. Owns the waterline so fish, bubbles and
// anything added later agree on where the top of the water is, and hides the fact that
// any of this is DOM underneath.
export class Tank {
  private el: HTMLElement;
  private surface: HTMLElement;
  private surfaceRows: { row: HTMLElement; offset: number }[];

  constructor(el: HTMLElement) {
    this.el = el;

    this.surface = document.createElement("div");
    this.surface.classList.add("surface");
    this.el.appendChild(this.surface);

    // Two rows of tildes offset so they interleave into a zigzag. CSS stacks them on one
    // baseline and bobs them in opposite phase, so crest and trough trade places.
    this.surfaceRows = [0, GROUP_SIZE].map(offset => {
      const row = document.createElement("div");
      row.classList.add("surface-row");
      this.surface.appendChild(row);
      return { row, offset };
    });

    this.tileSurface();
    addEventListener("resize", () => this.tileSurface());
  }

  add(child: HTMLElement) {
    this.el.appendChild(child);
  }

  get width() {
    return this.el.clientWidth;
  }

  get height() {
    return this.el.clientHeight;
  }

  // Underside of the waterline. Nothing in the water belongs above this.
  get surfaceY() {
    return this.surface.offsetHeight;
  }

  // The scroll animation slides each row left by half its own width, so half a row has to
  // cover the tank or a gap scrolls through. Measure one tile and tile to fit rather than
  // guessing a repeat count that only holds at typical aspect ratios.
  private tileSurface() {
    const probe = this.surfaceRows[0].row;
    probe.textContent = pattern(0);
    const tileWidth = probe.offsetWidth;
    if (!tileWidth) return;

    const repeats = Math.ceil(this.width / tileWidth) + 1;
    for (const { row, offset } of this.surfaceRows) {
      const line = pattern(offset).repeat(repeats);
      row.textContent = line + line;
    }
  }
}

const GLYPHS = ["O", "o", "0"];

const RISE_MIN = 20; // px per second
const RISE_MAX = 45;

const SPAWN_MIN = 0.4; // seconds between bubbles
const SPAWN_MAX = 1.6;

export class Bubble {
  private div: HTMLDivElement;
  private x: number;
  private y: number;
  private speed: number;

  popped = false;

  constructor(tank: HTMLElement) {
    this.div = document.createElement("div");
    this.div.classList.add("bubble");
    this.div.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

    this.x = Math.random() * tank.clientWidth;
    this.y = tank.clientHeight;
    this.speed = RISE_MIN + Math.random() * (RISE_MAX - RISE_MIN);

    this.draw();
    tank.appendChild(this.div);
  }

  rise(dt: number, surfaceY: number) {
    this.y -= this.speed * dt;
    this.draw();

    if (this.y <= surfaceY) this.pop();
  }

  pop() {
    this.popped = true;
    this.div.textContent = "*";
    this.div.classList.add("bubble-pop");
    // CSS owns the pop duration; drop the node once it has played out.
    this.div.addEventListener("animationend", () => this.div.remove(), { once: true });
  }

  // Position rides on `translate` so the pop animation can have `transform` to itself.
  private draw() {
    this.div.style.translate = `${this.x}px ${this.y}px`;
  }
}

export function createBubbleStream(tank: HTMLElement, surface: HTMLElement) {
  let bubbles: Bubble[] = [];
  let nextSpawn = 0;

  return {
    update(dt: number) {
      nextSpawn -= dt;
      if (nextSpawn <= 0) {
        bubbles.push(new Bubble(tank));
        nextSpawn = SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN);
      }

      // Pop against the underside of the ripple, wherever it currently sits.
      const surfaceY = surface.offsetHeight;
      for (const bubble of bubbles) bubble.rise(dt, surfaceY);

      bubbles = bubbles.filter(bubble => !bubble.popped);
    }
  };
}

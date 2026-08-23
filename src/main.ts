import './style.css'
import { Tank } from './tank';
import { createSchool } from './fish';
import { createSeaweedBed } from './seaweed';
import { createBubbleStream } from './bubble';

const FISH_COUNT = 15;

// A backgrounded tab pauses rAF, so the first frame back can carry a huge delta.
// Cap it or every fish teleports across the tank on return.
const MAX_FRAME_SECONDS = 0.1;

const tank = new Tank(document.getElementById("tank") as HTMLElement);

createSeaweedBed(tank);
const school = createSchool(tank, FISH_COUNT);
const bubbles = createBubbleStream(tank);

let last = performance.now();

function loop(now: number) {
  const dt = Math.min((now - last) / 1000, MAX_FRAME_SECONDS);
  last = now;

  school.forEach(fish => fish.swim(dt));
  bubbles.update(dt);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

import './style.css'
import { Fish, type Color } from './fish';
import { createSeaweed } from './seaweed';
import { createRipple } from './ripple';

const tank = document.getElementById("tank") as HTMLElement;

createRipple(tank);

const seaweedCount = 60;
const seaweedSpacing = tank.clientWidth / seaweedCount;
for (let i = 0; i < seaweedCount; i++) {
  const x = i * seaweedSpacing + (Math.random() * seaweedSpacing - seaweedSpacing / 2);
  createSeaweed(tank, x, 4 + Math.floor(Math.random() * 30));
}

type FishTemplate = { body: string; color: Color; speed: number };

const FISH_TYPES: FishTemplate[] = [
  { body: "><(((('>", color: "green", speed: .7 },
  { body: "><>", color: "yellow", speed: 1.2 },
  { body: "><(((o>", color: "blue", speed: .5 },
  { body: "><[[[[(º>", color: "purple", speed: .3 },
  { body: "><((*>", color: "red", speed: 1 },
];

const fishList: Fish[] = Array.from({ length: 15 }, () => {
  const template = FISH_TYPES[Math.floor(Math.random() * FISH_TYPES.length)];
  return new Fish(tank, template.body, template.speed, template.color);
});

function loop() {
  fishList.forEach(fish => fish.swim());
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
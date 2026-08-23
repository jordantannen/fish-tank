import type { Tank } from './tank';

export type Color = "red" | "blue" | "yellow" | "green" | "purple";

type FishTemplate = { body: string; color: Color; speed: number };

const FISH_TYPES: FishTemplate[] = [
    { body: "><(((('>", color: "green", speed: .7 },
    { body: "><>", color: "yellow", speed: 1.2 },
    { body: "><(((o>", color: "blue", speed: .5 },
    { body: "><[[[[(º>", color: "purple", speed: .3 },
    { body: "><((*>", color: "red", speed: 1 },
];

// The speeds above were tuned as pixels-per-frame on a 60Hz display. Convert once to
// pixels-per-second so a 120Hz monitor doesn't swim everything at double speed.
const BASELINE_FPS = 60;

// Longest a fish holds a heading before picking a new one.
const MAX_HEADING_SECONDS = 80;

export class Fish {
    div: HTMLDivElement;
    tank: Tank;

    position: { x: number; y: number };
    velocity: { x: number; y: number } = { x: 0, y: 0 };

    speed: number;
    directionTimer: number = 0;
    color: Color;

    constructor(tank: Tank, body: string, speed: number, color: Color) {

        this.tank = tank;
        this.speed = speed * BASELINE_FPS;

        this.div = document.createElement("div");
        this.div.classList.add("fish");
        this.div.classList.add(color);
        this.color = color;

        const inner = document.createElement("span");
        inner.classList.add("fish-inner");
        inner.textContent = body;
        this.div.appendChild(inner);

        this.position = {
            x: Math.random() * tank.width,
            y: Math.random() * tank.height
        }

        tank.add(this.div);
        this.changeDirection();
    }

    changeDirection() {
        // Multipled by 2 to get a full circle in radians (0 to 2π)
        const angle = Math.random() * Math.PI * 2;
        this.velocity.x = Math.cos(angle) * this.speed;
        this.velocity.y = Math.sin(angle) * this.speed;
    }

    swim(dt: number) {
        this.directionTimer -= dt;

        if (this.directionTimer <= 0) {
            this.changeDirection();
            this.directionTimer = Math.random() * MAX_HEADING_SECONDS;
        }

        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;


        if (this.position.x <= 50 && this.velocity.x < 0) {
            this.velocity.x *= -1;
        }
        if (this.position.x >= this.tank.width - 40 && this.velocity.x > 0) {
            this.velocity.x *= -1;
        }

        // Bounce off the underside of the waterline, not an arbitrary offset,
        // so fish never swim up into the surface tildes.
        if (this.position.y <= this.tank.surfaceY && this.velocity.y < 0) {
            this.velocity.y *= -1;
        }
        if (this.position.y >= this.tank.height - 40 && this.velocity.y > 0) {
            this.velocity.y *= -1;
        }

        const angle = Math.atan2(this.velocity.y, this.velocity.x);
        // Past vertical, the rotation alone would leave the fish belly-up. scaleY runs
        // before the rotation, so the two flips cancel and it swims left right-side up.
        const flip = Math.abs(angle) > Math.PI / 2 ? " scaleY(-1)" : "";
        this.div.style.transform = `translate(${this.position.x}px, ${this.position.y}px) rotate(${angle}rad)${flip}`;
    }

}

export function createSchool(tank: Tank, count: number): Fish[] {
    return Array.from({ length: count }, () => {
        const template = FISH_TYPES[Math.floor(Math.random() * FISH_TYPES.length)];
        return new Fish(tank, template.body, template.speed, template.color);
    });
}

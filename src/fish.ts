export type Color = "red" | "blue" | "yellow" | "green" | "purple";

export class Fish {
    div: HTMLDivElement;
    tank: HTMLElement;

    position: { x: number; y: number };
    velocity: { x: number; y: number } = { x: 0, y: 0 };

    speed: number = 1;
    directionTimer: number = 0;
    color: Color;

    constructor(tank: HTMLElement, body: string, speed: number, color: Color) {

        this.tank = tank;
        this.speed = speed;

        this.div = document.createElement("div");
        this.div.classList.add("fish");
        this.div.classList.add(color);
        this.color = color;

        const inner = document.createElement("span");
        inner.classList.add("fish-inner");
        inner.textContent = body;
        this.div.appendChild(inner);

        this.position = {
            x: Math.random() * tank.clientWidth,
            y: Math.random() * tank.clientHeight
        }

        tank.appendChild(this.div);
        this.changeDirection();
    }

    changeDirection() {
        // Multipled by 2 to get a full circle in radians (0 to 2π)
        const angle = Math.random() * Math.PI * 2;
        this.velocity.x = Math.cos(angle) * this.speed;
        this.velocity.y = Math.sin(angle) * this.speed;
    }

    swim() {
        this.directionTimer--;

        if (this.directionTimer <= 0) {
            this.changeDirection();
            this.directionTimer = 60 * Math.random() * 80;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;


        if (this.position.x <= 50 && this.velocity.x < 0) {
            this.velocity.x *= -1;
        }
        if (this.position.x >= this.tank.clientWidth - 40 && this.velocity.x > 0) {
            this.velocity.x *= -1;
        }

        if (this.position.y <= 10 && this.velocity.y < 0) {
            this.velocity.y *= -1;
        }
        if (this.position.y >= this.tank.clientHeight - 40 && this.velocity.y > 0) {
            this.velocity.y *= -1;
        }

        const angle = Math.atan2(this.velocity.y, this.velocity.x);
        this.div.style.transform = `translate(${this.position.x}px, ${this.position.y}px) rotate(${angle}rad)`;
    }

}
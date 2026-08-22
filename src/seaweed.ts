export function createSeaweed(tank: HTMLElement, x: number, height: number) {
  const div = document.createElement("div");
  div.classList.add("seaweed");
  div.style.left = `${x}px`;
  div.style.setProperty("--sway-duration", `${3 + Math.random() * 2}s`);
  div.textContent = "/".repeat(height);
  tank.appendChild(div);
}

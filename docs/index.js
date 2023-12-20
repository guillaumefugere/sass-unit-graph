"use strict";

class Graph {
  constructor(node) {
    this.node = node;
    window.addEventListener("resize", this.update.bind(this));
    this.update();
  }

  update() {
    const style = window.getComputedStyle(this.node);

    const w = parseFloat(style.width);
    const vw = this.toInt(style.getPropertyValue("--vw"));
    const x = (vw / 1600) * w;
    const y = this.toInt(style.getPropertyValue("--y"));

    this.node.dataset.labelX = `100vw (${vw}px)`;
    this.node.dataset.labelY = `${y}px`;
    this.node.style.setProperty("--x", `${x}px`);
  }

  // This is not efficient, but it work to
  // transform an expression into pixel.
  // This won't be work for value belown 0.
  toInt(value) {
    const b = document.querySelector("body");
    b.style.height = value;
    const r = b.getBoundingClientRect().height;
    b.style.height = "";
    return r;
  }
}

Array.from(document.querySelectorAll(".graph")).forEach(
  (element) => new Graph(element)
);

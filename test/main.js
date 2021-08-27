"use strict";

const convertToPx = value => {
  const b = document.querySelector('body');
  b.style.height = value;
  const r = b.getBoundingClientRect().height;
  b.style.height = "";
  return r;
}

class ViewportWidth {
  constructor(node) {
    this.node = node;
    window.addEventListener("resize", this.update.bind(this));
    this.update();
  }

  update() {
    const style = window.getComputedStyle(this.node);
    this.node.innerHTML = `${convertToPx(style.getPropertyValue("--current-vw"))}px`;
  }
}

new ViewportWidth(document.querySelector('.vw'));

class UnitGraph {
  constructor(node) {
    this.node = node;
    window.addEventListener("resize", this.update.bind(this));
    this.update();
  }

  update() {
    const style = window.getComputedStyle(this.node);
    const value = style.getPropertyValue("--unit-graph");
    const pixel = `${convertToPx(value)}px`;
    this.node.innerHTML = `${value}<br>${pixel}`;
  }
}

Array.from(document.querySelectorAll('.test')).forEach(x => new UnitGraph(x));
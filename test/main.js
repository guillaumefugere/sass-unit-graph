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

Array.from(document.querySelectorAll('.vw')).forEach(x => new ViewportWidth(x));

class UnitGraph {
  constructor(node) {
    this.node = node;
    this.unitGraph = this.node.querySelector('[data-unit="graph"]');
    this.unitValue = this.node.querySelector('[data-unit="value"]');
    window.addEventListener("resize", this.update.bind(this));
    this.update();
  }

  update() {
    const style = window.getComputedStyle(this.node);
    this.unitGraph.innerHTML = `${style.getPropertyValue("--unit-graph")}`;
    this.unitValue.innerHTML = `${convertToPx(style.getPropertyValue("--unit-graph"))}px`;
  }
}

Array.from(document.querySelectorAll('.test')).forEach(x => new UnitGraph(x));
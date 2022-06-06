class Tooltip {
  element = null;
  static instance = null;
  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
    Tooltip.instance = this;
  }
  initialize() {
    document.addEventListener('pointerover', this.pointeroverHandler);
    document.addEventListener('pointerout', this.pointeroutHandler);
  }

  pointeroverHandler = (event) => {
    const target = event.target;
    if (!target.closest('[data-tooltip]')) {
      return;
    }

    this.render(target);
    document.addEventListener('mousemove', this.moveToltip);
  };

  moveToltip = (event) => {
    const [x, y] = [event.clientX, event.clientY];
    this.element.style.cssText = `left: ${x + 10}px; top: ${y + 10}px;`;
  };

  pointeroutHandler = (event) => {
    this.remove();
    document.removeEventListener('pointerout', this.pointeroverHandler);
    document.removeEventListener('mousemove', this.moveToltip);
  };

  render(target) {
    this.element = document.createElement('div');
    this.element.classList.add('tooltip');
    this.element.textContent = target ? target.dataset.tooltip : '';
    document.body.append(this.element);
  }

  remove() {
    if (this.element) {
      this.element.remove();
      document.removeEventListener('pointerout', this.pointeroverHandler);
    }
  }

  destroy() {
    document.removeEventListener('pointerout', this.pointeroverHandler);
    document.removeEventListener('pointerout', this.pointeroverHandler);
    document.removeEventListener('mousemove', this.moveToltip);
  }
}

export default Tooltip;

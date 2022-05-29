export default class NotificationMessage {
  $root = document.body;
  idTimeOut = null;
  attr = null;
  element = null;

  constructor(message = '', { duration = 0, type = 'success' } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.rootTagCreate();
  }

  rootTagCreate() {
    //       <div ${this.attr} class="notification success" style="--value:${value}s">
    const value = this.duration / 1000;
    this.attr = 'data-element="notification"';

    const div = document.createElement('div');
    div.classList.add('notification', this.type);
    div.setAttribute('style', `--value:${value}s`);
    div.setAttribute('data-element', 'notification');

    div.innerHTML = this.template;

    this.element = div;
  }

  get template() {
    return `
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">success</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
    `;
  }

  timer() {
    return setTimeout(() => {
      this.remove();
      this.attr = null;
    }, this.duration);
  }

  show(el = this.$root) {
    this.remove();

    el.insertAdjacentElement('beforeend', this.element);
    this.idTimeOut = this.timer();
  }

  remove() {
    const notification = this.$root.querySelector(
      '[data-element="notification"]'
    );

    if (notification) {
      notification.remove();
    }
    if (this.idTimeOut) {
      clearTimeout(this.idTimeOut);
    }
  }

  destroy() {
    this.remove();
    // this.$root = null;
    this.element = null;
  }
}

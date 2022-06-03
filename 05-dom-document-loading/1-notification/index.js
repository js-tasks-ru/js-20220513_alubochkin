export default class NotificationMessage {
  $body = document.body;
  static notification = null;
  static idTimeOut = null;
  element = document.createElement('div');

  constructor(message = '', { duration = 2000, type = 'success' } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.remove();

    this.notificationElement();
  }

  notificationElement() {
    const value = this.duration / 1000;

    this.element.classList.add('notification', this.type);
    this.element.setAttribute('style', `--value:${value}s`);
    this.element.setAttribute('data-element', 'notification');
    this.element.innerHTML = this.template;
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
    return setTimeout(() => this.remove(), this.duration);
  }

  show(el = this.$body) {
    NotificationMessage.notification = this.element;
    el.insertAdjacentElement('beforeend', this.element);
    NotificationMessage.idTimeOut = this.timer();
  }

  remove() {
    if (NotificationMessage.notification) {
      NotificationMessage.notification.remove();
      clearTimeout(NotificationMessage.idTimeOut);
      NotificationMessage.idTimeOut = null;
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}

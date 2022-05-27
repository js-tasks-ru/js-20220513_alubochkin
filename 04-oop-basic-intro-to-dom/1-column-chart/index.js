export default class ColumnChart {
  constructor(props) {
    this.data = props?.data;
    this.label = props?.label;
    this.value = props?.value;
    this.link = props?.link;
    this.formatHeading = props?.formatHeading;

    this.chartHeight = 50;
    if (this.formatHeading) {
      this.value = this.formatHeading(this.value);
    }

    if (!this.label && !this.value) {
      this.destroy();
    }

    this.element = this.createElement(
      'div',
      this.data?.length ? 'column-chart' : 'column-chart_loading',
      `--chart-height: ${this.chartHeight}`
    );
    this.element.innerHTML = this.createTemplate();
  }

  createElement(el, className, style = '') {
    if (el) {
      const elem = document.createElement(el);
      elem.classList.add(className);
      if (style) {
        elem.style.cssText = style;
      }
      return elem;
    }
  }

  get emptyTemplate() {
    return `
        <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">
          ${this.value ? this.value : ''}
        </div>
      </div>
      `;
  }

  get renderDataChart() {
    const maxValue = Math.max(...this.data);
    const data = this.data
      .map((item) => {
        const scale = 50 / maxValue;
        const value = Math.floor(item * scale);
        const percent = ((item / maxValue) * 100).toFixed(0) + '%';

        return `
          <div style="--value: ${value};" data-tooltip="${percent}"></div>
          `;
      })
      .join('');

    return `
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.value}</div>
        <div data-element="body" class="column-chart__chart">${data}</div>
      </div>
      `;
  }

  createTemplate() {
    const isData = !!this.data?.length;

    const template = `
      <div class="column-chart__title">Total ${this.label}
        <a href="/sales" class="column-chart__link">View all</a>
      </div>

      ${isData ? this.renderDataChart : this.emptyTemplate}

      `;

    return template;
  }

  update(props) {
    this.element.innerHTML = this.createTemplate();
  }

  remove() {
    const $el = this.element.parentElement;
    if ($el) {
      $el.remove();
    }
  }

  destroy() {
    return null;
  }
}

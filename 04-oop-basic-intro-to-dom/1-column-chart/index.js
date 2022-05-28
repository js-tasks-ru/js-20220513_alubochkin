export default class ColumnChart {
  chartHeight = 50;

  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading = (data) => data,
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;

    if (this.formatHeading) {
      this.value = this.formatHeading(this.value);
    }

    if (!this.label && !this.value) {
      this.destroy();
    }

    this.element = this.createElement({
      elem: 'div',
      className: 'column-chart',
      style: `--chart-height: ${this.chartHeight}`,
    });
    this.element.innerHTML = this.template;
  }

  createElement({ elem = '', className = '', style = '' }) {
    if (elem) {
      const root = document.createElement(elem);
      root.classList.add(className);
      root.style.cssText = style;
      if (!this.data.length) {
        root.classList.add('column-chart_loading');
      }
      return root;
    }
  }

  renderChart() {
    const maxValue = Math.max(...this.data);
    return this.data
      .map((item) => {
        const scale = 50 / maxValue;
        const value = Math.floor(item * scale);
        const percent = ((item / maxValue) * 100).toFixed(0) + '%';

        return `
          <div style="--value: ${value};" data-tooltip="${percent}"></div>
          `;
      })
      .join('');
  }

  get template() {
    const isData = !!this.data?.length;
    return `
      <div class="column-chart__title">Total ${this.label}
        <a href="/${this.link}" class="column-chart__link">View all</a>
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">
          ${this.value}
        </div>
        <div data-element="body" class="column-chart__chart">
          ${isData ? this.renderChart() : ''}
        </div>
      </div>
      `;
  }

  update(props) {
    this.element.innerHTML = this.template;
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

export default class SortableTable {
  element = document.createElement('div');
  subElements = {
    root: document.createElement('div'),
    headers: document.createElement('div'),
    body: document.createElement('div'),
  };
  fieldValue = null;
  orderValue = null;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.render();
  }

  sort(fieldValue, orderValue) {
    console.log(fieldValue, orderValue);

    const sortableFn = (a, b) => {
      const collator = new Intl.Collator('ru', {
        sensitivity: 'case',
        caseFirst: 'upper',
        numeric: true,
      });
      a = a[fieldValue];
      b = b[fieldValue];
      if (orderValue === 'desc') {
        return collator.compare(b, a);
      }
      return collator.compare(a, b);
    };
    this.data.sort(sortableFn);
    this.render();
  }

  get templateHeader() {
    return this.headerConfig
      .map(({ id, title, sortable, sortType }) => {
        return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="">
          <span>${title}</span>
        </div>
      `;
      })
      .join('');
  }

  get tempateProducts() {
    return this.data
      .map(({ images = [], title, quantity, price, sales, id }) => {
        const cellsSortable = [title, quantity, price, sales]
          .map((el) => {
            if (el) {
              return `<div class="sortable-table__cell">${el}</div>`;
            }
          })
          .join('');

        const image = images.length
          ? `<div class="sortable-table__cell">
              <img class="sortable-table-image" alt="Image" src="${images[0].url}">
            </div>`
          : '';

        return `
          <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
            ${image}
            ${cellsSortable}
          </a>
      `;
      })
      .join('');
  }

  clear() {
    for (const el in this.subElements) {
      this.subElements[el].innerHTML = '';
    }
  }

  roottemplate() {
    const { headers, body, root } = this.subElements;
    this.clear();

    body.classList.add('sortable-table__body');
    body.insertAdjacentHTML('afterbegin', this.tempateProducts);

    headers.classList.add('sortable-table__header', 'sortable-table__row');
    headers.insertAdjacentHTML('afterbegin', this.templateHeader);

    root.classList.add('sortable-table');
    root.insertAdjacentElement('afterbegin', headers);

    root.insertAdjacentElement('beforeend', body);
  }

  render() {
    this.roottemplate();
    this.element.classList.add('products-list__container');
    this.element.innerHTML = '';

    console.log('this.element', this.subElements);

    this.element.appendChild(this.subElements.root);
  }

  destroy() {
    this.element = null;
    return null;
  }
}

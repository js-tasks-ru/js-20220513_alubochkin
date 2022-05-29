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
    // return this.headerConfig.map(({ id, title, sortable, sortType }) => {});

    return `
    <div class="sortable-table__cell" data-id="images" data-sortable="false" data-order="">
        <span>Image</span>
    </div>
    <div class="sortable-table__cell" data-id="title" data-sortable="true" data-order="">
      <span>Name</span>
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
      </span>
      </div>
      <div class="sortable-table__cell" data-id="title" data-sortable="true" data-order="">
        <span>Quantity</span>
      </div>
      <div class="sortable-table__cell" data-id="quantity" data-sortable="true" data-order="">
        <span>Price</span>
      </div>
      <div class="sortable-table__cell" data-id="price" data-sortable="true" data-order="">
        <span>Sales</span>
      </div>
    `;
  }

  get tempateProducts() {
    return this.data
      .map(({ images = [], title, quantity, price, sales, id }) => {
        return `
          <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
            <div class="sortable-table__cell">
              <img 
                class="sortable-table-image" 
                alt="Image" 
                src="https://news-it.ru/images/default.jpg">
            </div>
            <div class="sortable-table__cell">${title}</div>

            <div class="sortable-table__cell">${quantity}</div>
            <div class="sortable-table__cell">${price}</div>
            <div class="sortable-table__cell">${sales}</div>
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

    root.classList.add('products-list__container');
    root.insertAdjacentElement('afterbegin', headers);

    root.insertAdjacentElement('beforeend', body);
  }

  render() {
    this.roottemplate();
    this.element.classList.add('sortable-table');
    this.element.innerHTML = '';

    console.log('this.element', this.element);

    this.element.appendChild(this.subElements.root);
  }

  destroy() {
    this.element = null;
    return null;
  }
}

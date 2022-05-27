import RangePicker from './components/range-picker/src/index.js';
import SortableTable from './components/sortable-table/src/index.js';
import ColumnChart from './components/column-chart/src/index.js';
import header from './bestsellers-header.js';

import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class Page {
  async init() {
    return fetchJson(BACKEND_URL);
  }

  async render() {
    const data = await this.init();

    console.log(data);

    return `<h1> Render </h1>`;
  }
}

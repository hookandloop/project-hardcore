import { Datagrid } from '../../../src/components/datagrid/datagrid';
import { Formatters } from '../../../src/components/datagrid/datagrid.formatters';

const datagridHTML = require('../../../app/views/components/datagrid/example-editable.html');
const svg = require('../../../src/components/icons/svg.html');
const originalData = require('../../../app/data/datagrid-sample-data-editable');

let data = [];
require('../../../src/components/locale/cultures/en-US.js');

let datagridEl;
let svgEl;
let datagridObj;

// Define Columns for the Grid.
const columns = [];
columns.push({ id: 'selectionCheckbox', sortable: false, resizable: false, formatter: Formatters.SelectionCheckbox, align: 'center' });
columns.push({ id: 'productId', name: 'Id', field: 'productId', reorderable: true, formatter: Formatters.Text, width: 100, filterType: 'Text' });
columns.push({ id: 'productName', name: 'Product Name', field: 'productName', reorderable: true, formatter: Formatters.Hyperlink, width: 300, filterType: 'Text' });
columns.push({ id: 'activity', name: 'Activity', field: 'activity', reorderable: true, filterType: 'Text', required: true, validate: 'required' });
columns.push({ id: 'hidden', hidden: true, name: 'Hidden', field: 'hidden', filterType: 'Text' });
columns.push({
  id: 'price', align: 'right', name: 'Actual Price', field: 'price', reorderable: true, formatter: Formatters.Decimal, validate: 'required', numberFormat: { minimumFractionDigits: 0, maximumFractionDigits: 0, style: 'currency', currencySign: '$' }
});
columns.push({ id: 'percent', align: 'right', name: 'Actual %', field: 'percent', reorderable: true, formatter: Formatters.Decimal, numberFormat: { minimumFractionDigits: 0, maximumFractionDigits: 0, style: 'percent' } });
columns.push({ id: 'orderDate', name: 'Order Date', field: 'orderDate', reorderable: true, formatter: Formatters.Date, dateFormat: 'M/d/yyyy', validate: 'required date' });
columns.push({ id: 'phone', name: 'Phone', field: 'phone', reorderable: true, filterType: 'Text', formatter: Formatters.Text });

describe('Datagrid Validation API', () => {
  const Locale = window.Soho.Locale;

  beforeEach(() => {
    datagridEl = null;
    svgEl = null;
    datagridObj = null;
    document.body.insertAdjacentHTML('afterbegin', svg);
    document.body.insertAdjacentHTML('afterbegin', datagridHTML);
    datagridEl = document.body.querySelector('#datagrid');
    svgEl = document.body.querySelector('.svg-icons');

    Locale.set('en-US');
    data = JSON.parse(JSON.stringify(originalData));

    datagridObj = new Datagrid(datagridEl, {
      columns,
      dataset: data,
      editable: true,
      clickToSelect: false,
      selectable: 'multiple',
      toolbar: { title: 'Data Grid Header Title', results: true, personalize: true, actions: true, rowHeight: true, keywordFilter: true, collapsibleFilter: true },
      paging: true,
      pagesize: 5,
      pagesizes: [2, 5, 6],
    });
  });

  afterEach(() => {
    datagridObj.destroy();
    datagridEl.parentNode.removeChild(datagridEl);
    svgEl.parentNode.removeChild(svgEl);

    const rowEl = document.body.querySelector('.row');
    rowEl.parentNode.removeChild(rowEl);
  });

  it('Should be able to set/remove rowStatus type Error', () => {
    datagridObj.rowStatus(0, 'error', 'Error');

    expect(document.body.querySelectorAll('tbody tr')[0].classList.contains('rowstatus-row-error')).toBeTruthy();
    expect(document.body.querySelectorAll('tbody tr')[0].querySelectorAll('.icon-rowstatus').length).toEqual(1);

    datagridObj.resetRowStatus();

    expect(document.body.querySelectorAll('tbody tr')[0].classList.contains('rowstatus-row-error')).toBeFalsy();
    expect(document.body.querySelectorAll('tbody tr')[0].querySelectorAll('.icon-rowstatus').length).toEqual(0);
  });

  it('Should be able to set/remove rowStatus type Alert', () => {
    datagridObj.rowStatus(1, 'alert', 'Alert');

    expect(document.body.querySelectorAll('tbody tr')[1].classList.contains('rowstatus-row-alert')).toBeTruthy();
    expect(document.body.querySelectorAll('tbody tr')[1].querySelectorAll('.icon-rowstatus').length).toEqual(1);

    datagridObj.resetRowStatus();

    expect(document.body.querySelectorAll('tbody tr')[1].classList.contains('rowstatus-row-alert')).toBeFalsy();
    expect(document.body.querySelectorAll('tbody tr')[1].querySelectorAll('.icon-rowstatus').length).toEqual(0);
  });

  it('Should be able to set/remove rowStatus type Info', () => {
    datagridObj.rowStatus(2, 'info', 'Info');

    expect(document.body.querySelectorAll('tbody tr')[2].classList.contains('rowstatus-row-info')).toBeTruthy();
    expect(document.body.querySelectorAll('tbody tr')[2].querySelectorAll('.icon-rowstatus').length).toEqual(1);

    datagridObj.resetRowStatus();

    expect(document.body.querySelectorAll('tbody tr')[2].classList.contains('rowstatus-row-info')).toBeFalsy();
    expect(document.body.querySelectorAll('tbody tr')[2].querySelectorAll('.icon-rowstatus').length).toEqual(0);
  });

  it('Should be able to set/remove rowStatus type In-Progress', () => {
    datagridObj.rowStatus(3, 'in-progress', 'inProgress');

    expect(document.body.querySelectorAll('tbody tr')[3].classList.contains('rowstatus-row-in-progress')).toBeTruthy();
    expect(document.body.querySelectorAll('tbody tr')[3].querySelectorAll('.icon-rowstatus').length).toEqual(1);

    datagridObj.resetRowStatus();

    expect(document.body.querySelectorAll('tbody tr')[3].classList.contains('rowstatus-row-in-progress')).toBeFalsy();
    expect(document.body.querySelectorAll('tbody tr')[3].querySelectorAll('.icon-rowstatus').length).toEqual(0);
  });

  it('Should be able to set/remove rowStatus type Confirm', () => {
    datagridObj.rowStatus(4, 'confirm', 'Confirm');

    expect(document.body.querySelectorAll('tbody tr')[4].classList.contains('rowstatus-row-confirm')).toBeTruthy();
    expect(document.body.querySelectorAll('tbody tr')[4].querySelectorAll('.icon-rowstatus').length).toEqual(1);

    datagridObj.resetRowStatus();

    expect(document.body.querySelectorAll('tbody tr')[4].classList.contains('rowstatus-row-confirm')).toBeFalsy();
    expect(document.body.querySelectorAll('tbody tr')[4].querySelectorAll('.icon-rowstatus').length).toEqual(0);
  });

  it('Should be able to set/remove rowStatus type Dirty', () => {
    datagridObj.rowStatus(0, 'dirty');

    expect(document.body.querySelectorAll('tbody tr')[0].classList.contains('rowstatus-row-dirty')).toBeTruthy();
    expect(document.body.querySelectorAll('tbody tr')[0].querySelectorAll('.icon-rowstatus').length).toEqual(1);

    datagridObj.resetRowStatus();

    expect(document.body.querySelectorAll('tbody tr')[0].classList.contains('rowstatus-row-dirty')).toBeFalsy();
    expect(document.body.querySelectorAll('tbody tr')[0].querySelectorAll('.icon-rowstatus').length).toEqual(0);
  });

  it('Should be able to set/remove rowStatus type New', () => {
    datagridObj.rowStatus(1, 'new', 'New');

    expect(document.body.querySelectorAll('tbody tr')[1].classList.contains('rowstatus-row-new')).toBeTruthy();
    expect(document.body.querySelectorAll('tbody tr')[1].querySelectorAll('.icon-rowstatus').length).toEqual(1);

    datagridObj.resetRowStatus();

    expect(document.body.querySelectorAll('tbody tr')[1].classList.contains('rowstatus-row-new')).toBeFalsy();
    expect(document.body.querySelectorAll('tbody tr')[1].querySelectorAll('.icon-rowstatus').length).toEqual(0);
  });

  it('Should be able to show/remove Specific Row Error', () => {
    datagridObj.showRowError(2, 'This row has a custom error message.', 'error');

    expect(document.body.querySelectorAll('tbody tr')[2].classList.contains('rowstatus-row-error')).toBeTruthy();
    expect(document.body.querySelectorAll('tbody tr')[2].querySelectorAll('.icon-rowstatus').length).toEqual(1);

    datagridObj.resetRowStatus();

    expect(document.body.querySelectorAll('tbody tr')[2].classList.contains('rowstatus-row-error')).toBeFalsy();
    expect(document.body.querySelectorAll('tbody tr')[2].querySelectorAll('.icon-rowstatus').length).toEqual(0);
  });

  it('Should validate All Cells in Row', (done) => {
    datagridObj.validateRow(2);

    setTimeout(() => {
      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').classList.contains('error')).toBeTruthy();
      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').querySelectorAll('.icon-error').length).toEqual(1);
      done();
    }, 0);
  });

  it('Should validate All Rows and cells in grid', (done) => {
    datagridObj.validateAll();

    setTimeout(() => {
      expect(document.body.querySelectorAll('tbody tr')[0].querySelector('td[aria-colindex="8"]').classList.contains('error')).toBeTruthy();
      expect(document.body.querySelectorAll('tbody tr')[0].querySelector('td[aria-colindex="8"]').querySelectorAll('.icon-error').length).toEqual(1);

      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').classList.contains('error')).toBeTruthy();
      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').querySelectorAll('.icon-error').length).toEqual(1);

      expect(document.body.querySelectorAll('tbody tr')[3].querySelector('td[aria-colindex="6"]').classList.contains('error')).toBeTruthy();
      expect(document.body.querySelectorAll('tbody tr')[3].querySelector('td[aria-colindex="6"]').querySelectorAll('.icon-error').length).toEqual(1);
      done();
    }, 0);
  });

  it('Should clear specific Row error', (done) => {
    datagridObj.validateRow(2);

    setTimeout(() => {
      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').classList.contains('error')).toBeTruthy();
      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').querySelectorAll('.icon-error').length).toEqual(1);

      datagridObj.clearRowError(2);

      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').classList.contains('error')).toBeFalsy();
      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').querySelectorAll('.icon-error').length).toEqual(0);
      done();
    }, 0);
  });

  it('Should clear errors from all rows and cells in grid', (done) => {
    datagridObj.validateAll();

    setTimeout(() => {
      expect(document.body.querySelectorAll('tbody tr')[0].querySelector('td[aria-colindex="8"]').classList.contains('error')).toBeTruthy();
      expect(document.body.querySelectorAll('tbody tr')[0].querySelector('td[aria-colindex="8"]').querySelectorAll('.icon-error').length).toEqual(1);

      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').classList.contains('error')).toBeTruthy();
      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').querySelectorAll('.icon-error').length).toEqual(1);

      expect(document.body.querySelectorAll('tbody tr')[3].querySelector('td[aria-colindex="6"]').classList.contains('error')).toBeTruthy();
      expect(document.body.querySelectorAll('tbody tr')[3].querySelector('td[aria-colindex="6"]').querySelectorAll('.icon-error').length).toEqual(1);

      datagridObj.clearAllErrors();

      expect(document.body.querySelectorAll('tbody tr')[0].querySelector('td[aria-colindex="8"]').classList.contains('error')).toBeFalsy();
      expect(document.body.querySelectorAll('tbody tr')[0].querySelector('td[aria-colindex="8"]').querySelectorAll('.icon-error').length).toEqual(0);

      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').classList.contains('error')).toBeFalsy();
      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').querySelectorAll('.icon-error').length).toEqual(0);

      expect(document.body.querySelectorAll('tbody tr')[3].querySelector('td[aria-colindex="6"]').classList.contains('error')).toBeFalsy();
      expect(document.body.querySelectorAll('tbody tr')[3].querySelector('td[aria-colindex="6"]').querySelectorAll('.icon-error').length).toEqual(0);
      done();
    }, 0);
  });

  it('Should clear a cell with an error of a given type', (done) => {
    datagridObj.validateRow(2);

    setTimeout(() => {
      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').classList.contains('error')).toBeTruthy();
      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').querySelectorAll('.icon-error').length).toEqual(1);

      datagridObj.clearCellError(2, 3, 'error');

      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').classList.contains('error')).toBeFalsy();
      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').querySelectorAll('.icon-error').length).toEqual(0);
      done();
    }, 0);
  });

  it('Should remove messages form a cell element', (done) => {
    datagridObj.validateRow(2);

    setTimeout(() => {
      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').classList.contains('error')).toBeTruthy();
      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').querySelectorAll('.icon-error').length).toEqual(1);

      const rowNode = datagridObj.dataRowNode(2);
      const node = datagridObj.cellNode(rowNode, 3);

      datagridObj.clearNodeErrors(node, 'error');

      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').classList.contains('error')).toBeFalsy();
      expect(document.body.querySelectorAll('tbody tr')[2].querySelector('td[aria-colindex="4"]').querySelectorAll('.icon-error').length).toEqual(0);
      done();
    }, 0);
  });

  it('Should show currently dirty rows', (done) => {
    datagridObj.rowStatus(1, 'dirty');
    datagridObj.rowStatus(3, 'dirty');

    setTimeout(() => {
      const dirtyRows = datagridObj.dirtyRows();

      expect(dirtyRows.length).toEqual(2);
      done();
    }, 0);
  });

  it('Should show in title non visible error on another page', () => {
    datagridObj.nonVisibleCellErrors = [{ row: 5, cell: 7, message: 'Some Error', type: 'error' }];
    datagridObj.showNonVisibleCellErrors();

    expect(document.body.querySelectorAll('.title .icon-error').length).toEqual(1);
  });

  it('Should show in title non visible error on another page of a given type', () => {
    const nonVisibleCellErrors = [{ row: 5, cell: 7, message: 'Some alert msg', type: 'alert' }];
    datagridObj.showNonVisibleCellErrorType(nonVisibleCellErrors, nonVisibleCellErrors[0].type);

    expect(document.body.querySelectorAll('.title .icon-alert').length).toEqual(1);
  });

  it('Should clear a non visible (on another page) error of a given type', () => {
    datagridObj.nonVisibleCellErrors = [{ row: 5, cell: 7, message: 'Some info msg', type: 'info' }];
    datagridObj.showNonVisibleCellErrors();

    expect(document.body.querySelectorAll('.title .icon-info').length).toEqual(1);
    datagridObj.clearNonVisibleCellErrors(5, 7, 'info');

    expect(document.body.querySelectorAll('.title .icon-info').length).toEqual(0);
  });
});

import { Datagrid } from '../../../src/components/datagrid/datagrid';
import { Formatters } from '../../../src/components/datagrid/datagrid.formatters';

const datagridHTML = require('../../../app/views/components/datagrid/example-index.html');
const svg = require('../../../src/components/icons/svg.html');
const originalData = require('../../../app/data/datagrid-sample-data');

let data = [];
require('../../../src/components/locale/cultures/en-US.js');

let datagridEl;
let svgEl;
let datagridObj;

const pagingGetData = (page, size) => {
  const thisData = [];
  const start = size * (page - 1);
  const end = start + size;
  const dataLen = data.length;
  for (let i = start; i < end && i < dataLen; i++) {
    thisData.push(data[i]);
  }
  return thisData;
};

const pagingDataSource = (req, res) => {
  const pagesize = 3;
  let sampleData = [];
  if (req.type === 'initial' || req.type === 'first') {
    req.firstPage = true;
    req.lastPage = false;
    sampleData = pagingGetData(1, pagesize);
  } else if (req.type === 'last') {
    req.firstPage = false;
    req.lastPage = true;
    sampleData = pagingGetData(pagesize, pagesize);
  } else if (req.type === 'next') {
    req.firstPage = false;
    req.lastPage = false;
    req.activePage++;
    sampleData = pagingGetData(req.activePage, pagesize);
  }

  if (req.indeterminate) {
    req.activePage = -1;
  }

  req.total = pagesize;
  res(sampleData, req);
};

// Define Columns for the Grid.
const columns = [];
columns.push({ id: 'productId', name: 'Id', field: 'productId', reorderable: true, formatter: Formatters.Text, width: 100, filterType: 'Text' });
columns.push({ id: 'productName', name: 'Product Name', field: 'productName', reorderable: true, formatter: Formatters.Hyperlink, width: 300, filterType: 'Text' });
columns.push({ id: 'activity', name: 'Activity', field: 'activity', reorderable: true, filterType: 'Text' });
columns.push({ id: 'hidden', hidden: true, name: 'Hidden', field: 'hidden', filterType: 'Text' });
columns.push({ id: 'price', align: 'right', name: 'Actual Price', field: 'price', reorderable: true, formatter: Formatters.Decimal, numberFormat: { minimumFractionDigits: 0, maximumFractionDigits: 0, style: 'currency', currencySign: '$' } });
columns.push({ id: 'percent', align: 'right', name: 'Actual %', field: 'percent', reorderable: true, formatter: Formatters.Decimal, numberFormat: { minimumFractionDigits: 0, maximumFractionDigits: 0, style: 'percent' } });
columns.push({ id: 'orderDate', name: 'Order Date', field: 'orderDate', reorderable: true, formatter: Formatters.Date, dateFormat: 'M/d/yyyy' });
columns.push({ id: 'phone', name: 'Phone', field: 'phone', reorderable: true, filterType: 'Text', formatter: Formatters.Text });

describe('Datagrid Selection API', () => {
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

    datagridObj = new Datagrid(datagridEl, { dataset: data, columns });
  });

  afterEach(() => {
    datagridObj.destroy();
    datagridEl.parentNode.removeChild(datagridEl);
    svgEl.parentNode.removeChild(svgEl);

    const rowEl = document.body.querySelector('.row');
    rowEl.parentNode.removeChild(rowEl);
  });

  it('Should be able to single select', (done) => {
    datagridObj.destroy();
    datagridObj = new Datagrid(datagridEl, { dataset: data, columns, selectable: 'single' });

    const spyEvent = spyOnEvent($(datagridEl), 'selected');
    $(datagridEl).on('selected', (e, args) => {
      expect(args[0].idx).toEqual(1);
      expect(args[0].data.id).toEqual('2');
      done();
    });

    document.body.querySelectorAll('tr')[2].querySelector('td').click();

    expect(spyEvent).toHaveBeenTriggered();
    $(datagridEl).off('selected');
    datagridObj.unSelectAllRows();
  });

  it('Should be able to single select with api', (done) => {
    datagridObj.destroy();
    datagridObj = new Datagrid(datagridEl, { dataset: data, columns, selectable: 'single' });

    const spyEvent = spyOnEvent($(datagridEl), 'selected');
    $(datagridEl).on('selected', (e, args) => {
      expect(args[0].idx).toEqual(1);
      expect(args[0].data.id).toEqual('2');
      done();
    });

    datagridObj.selectRow(1);

    expect(spyEvent).toHaveBeenTriggered();

    spyEvent.reset();
    datagridObj.selectRow(1, true, true);

    expect(spyEvent.calls.count()).toEqual(0);
    $(datagridEl).off('selected');
    datagridObj.unSelectAllRows();
  });

  it('Should be able to multi select', (done) => {
    datagridObj.destroy();
    datagridObj = new Datagrid(datagridEl, { dataset: data, columns, selectable: 'multi' });

    const spyEvent = spyOnEvent($(datagridEl), 'selected');
    let cnt = 0;
    $(datagridEl).on('selected', (e, args) => {
      cnt++;
      if (cnt === 2) {
        expect(args[0].idx).toEqual(1);
        expect(args[0].data.id).toEqual('2');
        expect(args[1].idx).toEqual(2);
        expect(args[1].data.id).toEqual('3');
      }
      done();
    });

    document.body.querySelectorAll('tr')[2].querySelector('td').click();
    document.body.querySelectorAll('tr')[3].querySelector('td').click();

    expect(spyEvent).toHaveBeenTriggered();
    $(datagridEl).off('selected');
    datagridObj.unSelectAllRows();
  });

  it('Should be able to unselect', () => {
    datagridObj.destroy();
    datagridObj = new Datagrid(datagridEl, { dataset: data, columns, selectable: 'multi' });

    document.body.querySelectorAll('tr')[2].querySelector('td').click();
    document.body.querySelectorAll('tr')[3].querySelector('td').click();

    expect(datagridObj.selectedRows().length).toEqual(2);
    expect(datagridObj.selectedRows()[0].idx).toEqual(1);
    expect(datagridObj.selectedRows()[1].idx).toEqual(2);
    datagridObj.unselectRow(1);
    datagridObj.unselectRow(2);

    expect(datagridObj.selectedRows().length).toEqual(0);
  });

  it('Should be able to remove selected rows', () => {
    datagridObj.destroy();
    datagridObj = new Datagrid(datagridEl, { dataset: data, columns, selectable: 'multi' });

    const trs = document.body.querySelectorAll('tbody tr');
    trs[2].querySelector('td').click();
    trs[3].querySelector('td').click();

    datagridObj.removeSelected();

    expect(document.body.querySelectorAll('tbody tr').length).toEqual(5);
    expect(datagridObj.selectedRows().length).toEqual(0);

    datagridObj.updateDataset(originalData);
  });

  it('Should be able to remove all selected', () => {
    datagridObj.destroy();
    datagridObj = new Datagrid(datagridEl, { dataset: data, columns, selectable: 'multi' });

    const trs = document.body.querySelectorAll('tbody tr');
    trs[0].querySelector('td').click();
    trs[1].querySelector('td').click();
    trs[2].querySelector('td').click();
    trs[3].querySelector('td').click();
    trs[4].querySelector('td').click();
    trs[5].querySelector('td').click();
    trs[6].querySelector('td').click();

    datagridObj.removeSelected();

    expect(document.body.querySelectorAll('tbody tr').length).toEqual(0);
    expect(datagridObj.selectedRows().length).toEqual(0);

    datagridObj.updateDataset(originalData);
  });

  it('Should be able to remove all in ascending order', () => {
    datagridObj.destroy();
    datagridObj = new Datagrid(datagridEl, { dataset: data, columns, selectable: 'multi' });

    const trs = document.body.querySelectorAll('tbody tr');
    trs[3].querySelector('td').click();
    trs[2].querySelector('td').click();

    datagridObj.removeSelected();

    expect(document.body.querySelectorAll('tbody tr').length).toEqual(5);
    expect(datagridObj.selectedRows().length).toEqual(0);

    datagridObj.updateDataset(originalData);
  });

  it('Should be able to remove all in descending order', () => {
    datagridObj.destroy();
    datagridObj = new Datagrid(datagridEl, { dataset: data, columns, selectable: 'multi' });

    const trs = document.body.querySelectorAll('tbody tr');
    trs[2].querySelector('td').click();
    trs[3].querySelector('td').click();

    datagridObj.removeSelected();

    expect(document.body.querySelectorAll('tbody tr').length).toEqual(5);
    expect(datagridObj.selectedRows().length).toEqual(0);

    datagridObj.updateDataset(originalData);
  });

  it('Should test paging select client-side Single', () => {
    datagridObj.destroy();

    const options = { dataset: data, columns, selectable: 'single', paging: true, pagesize: 3 };
    datagridObj = new Datagrid(datagridEl, options);

    expect(datagridObj.selectedRows().length).toEqual(0);
    datagridObj.selectRow(2);

    expect(datagridObj.selectedRows().length).toEqual(1);
    datagridObj.selectRow(1);
    datagridObj.selectRow(5);

    expect(datagridObj.selectedRows().length).toEqual(1);

    datagridObj.unSelectAllRows();
  });

  it('Should test paging select client-side Multiple', () => {
    datagridObj.destroy();

    const options = { dataset: data, columns, selectable: 'multiple', paging: true, pagesize: 3 };
    datagridObj = new Datagrid(datagridEl, options);

    expect(datagridObj.selectedRows().length).toEqual(0);
    datagridObj.selectRow(2);

    expect(datagridObj.selectedRows().length).toEqual(1);
    datagridObj.selectRow(1);
    datagridObj.selectRow(5);
    datagridObj.selectRows([4, 6]);

    expect(datagridObj.selectedRows().length).toEqual(5);

    datagridObj.unSelectAllRows();
  });

  it('Should test paging select server-side Single', (done) => {
    datagridObj.destroy();
    const options = { columns, selectable: 'single', paging: true, pagesize: 3, source: pagingDataSource };
    datagridObj = new Datagrid(datagridEl, options);

    setTimeout(() => {
      expect(datagridObj.selectedRows().length).toEqual(0);
      datagridObj.selectRow(2);

      expect(datagridObj.selectedRows().length).toEqual(1);
      datagridObj.selectRows([3, 4]);

      expect(datagridObj.selectedRows().length).toEqual(0);
      datagridObj.selectRows([1]);

      expect(datagridObj.selectedRows().length).toEqual(1);
      datagridObj.pager.activePage = -1;
      datagridObj.pager.setActivePage(1, false, 'next');

      setTimeout(() => {
        expect(datagridObj.selectedRows().length).toEqual(0);
        datagridObj.selectRow(2);

        expect(datagridObj.selectedRows().length).toEqual(0);
        datagridObj.selectRows([3, 4]);

        expect(datagridObj.selectedRows().length).toEqual(1);
        datagridObj.selectRows([1]);

        expect(datagridObj.selectedRows().length).toEqual(0);

        datagridObj.unSelectAllRows();
        done();
      }, 1);
    }, 1);
  });

  it('Should test paging select server-side Multiple', (done) => {
    datagridObj.destroy();
    const options = { columns, selectable: 'multiple', paging: true, pagesize: 3, source: pagingDataSource };
    datagridObj = new Datagrid(datagridEl, options);

    setTimeout(() => {
      expect(datagridObj.selectedRows().length).toEqual(0);
      datagridObj.selectRow(2);
      datagridObj.selectRows([1, 4]);

      expect(datagridObj.selectedRows().length).toEqual(2);
      datagridObj.pager.activePage = -1;
      datagridObj.pager.setActivePage(1, false, 'next');

      setTimeout(() => {
        expect(datagridObj.selectedRows().length).toEqual(0);
        datagridObj.selectRow(2);
        datagridObj.selectRows([1, 4]);

        expect(datagridObj.selectedRows().length).toEqual(1);

        datagridObj.unSelectAllRows();
        done();
      }, 1);
    }, 1);
  });

  it('Should test paging select indeterminate Single', (done) => {
    datagridObj.destroy();
    const options = { columns, selectable: 'single', paging: true, pagesize: 3, indeterminate: true, source: pagingDataSource };
    datagridObj = new Datagrid(datagridEl, options);

    setTimeout(() => {
      expect(datagridObj.selectedRows().length).toEqual(0);
      datagridObj.selectRow(2);

      expect(datagridObj.selectedRows().length).toEqual(1);
      datagridObj.selectRows([3, 4]);

      expect(datagridObj.selectedRows().length).toEqual(0);
      datagridObj.selectRows([1]);

      expect(datagridObj.selectedRows().length).toEqual(1);
      datagridObj.pager.activePage = -1;
      datagridObj.pager.setActivePage(1, false, 'next');

      setTimeout(() => {
        expect(datagridObj.selectedRows().length).toEqual(0);
        datagridObj.selectRow(2);

        expect(datagridObj.selectedRows().length).toEqual(1);
        datagridObj.selectRows([3, 4]);

        expect(datagridObj.selectedRows().length).toEqual(0);
        datagridObj.selectRows([1]);

        expect(datagridObj.selectedRows().length).toEqual(1);

        datagridObj.unSelectAllRows();
        done();
      }, 1);
    }, 1);
  });

  it('Should test paging select indeterminate Multiple', (done) => {
    datagridObj.destroy();
    const options = { columns, selectable: 'multiple', paging: true, pagesize: 3, indeterminate: true, source: pagingDataSource };
    datagridObj = new Datagrid(datagridEl, options);

    setTimeout(() => {
      expect(datagridObj.selectedRows().length).toEqual(0);
      datagridObj.selectRow(2);
      datagridObj.selectRows([1, 4]);

      expect(datagridObj.selectedRows().length).toEqual(2);
      datagridObj.pager.activePage = -1;
      datagridObj.pager.setActivePage(1, false, 'next');

      setTimeout(() => {
        expect(datagridObj.selectedRows().length).toEqual(0);
        datagridObj.selectRow(2);
        datagridObj.selectRows([1, 4]);

        expect(datagridObj.selectedRows().length).toEqual(2);

        datagridObj.unSelectAllRows();
        done();
      }, 1);
    }, 1);
  });

  it('Should allow an array in selectRows', (done) => {
    datagridObj.destroy();
    const options = { columns, selectable: 'multiple', paging: true, pagesize: 5 };
    datagridObj = new Datagrid(datagridEl, options);

    expect(datagridObj.selectedRows().length).toEqual(0);
    datagridObj.selectRows([1, 4]);

    setTimeout(() => {
      expect(datagridObj.selectedRows().length).toEqual(2);
      datagridObj.unSelectAllRows();
      done();
    }, 1);
  });

  it('Should allow a number in selectRows', (done) => {
    datagridObj.destroy();
    const options = { columns, selectable: 'multiple', paging: true, pagesize: 5 };
    datagridObj = new Datagrid(datagridEl, options);

    expect(datagridObj.selectedRows().length).toEqual(0);
    datagridObj.selectRows(1);

    setTimeout(() => {
      expect(datagridObj.selectedRows().length).toEqual(1);
      datagridObj.unSelectAllRows();
      done();
    }, 1);
  });
});

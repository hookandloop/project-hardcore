import { ListView } from '../listview';

const listviewHTML = require('../example-index.html');
const svg = require('../../icons/svg.html');
const data = require('../../../../demoapp/data/inventory-tasks.json');

let listviewEl;
let listviewAPI;
let listviewItemEls;
let listviewTemplateScript;
let svgEl;

describe('Listview API', () => {
  beforeEach(() => {
    listviewEl = null;
    listviewAPI = null;
    svgEl = null;

    document.body.insertAdjacentHTML('afterbegin', svg);
    document.body.insertAdjacentHTML('afterbegin', listviewHTML);

    svgEl = document.body.querySelector('.svg-icons');
    listviewEl = document.body.querySelector('.listview');
    listviewTemplateScript = document.getElementById('task-tmpl').innerHTML;
    listviewEl.removeAttribute('data-options');
    listviewEl.classList.add('no-init');

    listviewAPI = new ListView(listviewEl, {
      dataset: data,
      template: listviewTemplateScript
    });

    listviewItemEls = listviewEl.querySelectorAll('li');
  });

  afterEach(() => {
    listviewAPI.destroy();
    svgEl.parentNode.removeChild(svgEl);
    listviewEl.parentNode.removeChild(listviewEl);
  });

  it('Can be invoked', () => {
    expect(listviewAPI).toEqual(jasmine.any(Object));
  });

  it('Can be disabled and re-enabled', () => {
    listviewAPI.disable();

    expect(listviewEl.classList.contains('is-disabled')).toBeTruthy();

    listviewAPI.enable();

    expect(listviewEl.className.indexOf('is-disabled')).toEqual(-1);
  });

  it('Properly detects the total number of listview items', () => {
    const ds = listviewAPI.settings.dataset;
    const totals = listviewAPI.getTotals(ds);

    expect(totals).toBeDefined();
    expect(totals.count).toBeDefined();
    expect(totals.count).toEqual(12);
  });

  it('Can select a list item with a numeric index', () => {
    const index = 0;
    listviewAPI.select(index);
    const selectedEl = listviewAPI.getSelected();

    expect(listviewItemEls.item(index)).toEqual(selectedEl[0]);
  });

  it('Can select a list item with an element reference', () => {
    const index = 2;
    const thirdEl = listviewEl.querySelectorAll('li').item(index);
    listviewAPI.select($(thirdEl));
    const selectedEl = listviewAPI.getSelected();

    expect(listviewItemEls.item(index)).toEqual(selectedEl[0]);
  });

  // Note: currently checks $.data()
  it('Can be destroyed', () => {
    listviewAPI.destroy();

    expect($(listviewEl).data('listview')).toBeFalsy();
  });
});

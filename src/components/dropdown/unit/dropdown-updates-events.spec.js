import { Dropdown } from '../dropdown';

const dropdownHTML = require('../example-index.html');
const svg = require('../../icons/svg.html');

let dropdownEl;
let svgEl;
let dropdownObj;

describe('Dropdown updates, events', () => {
  beforeEach(() => {
    dropdownEl = null;
    svgEl = null;
    dropdownObj = null;
    document.body.insertAdjacentHTML('afterbegin', dropdownHTML);
    document.body.insertAdjacentHTML('afterbegin', svg);
    dropdownEl = document.body.querySelector('.dropdown');
    svgEl = document.body.querySelector('.svg-icons');
    dropdownEl.classList.add('no-init');
    dropdownObj = new Dropdown(dropdownEl);
  });

  afterEach(() => {
    dropdownObj.destroy();
    $('.dropdown').destroy();
    dropdownEl.parentNode.removeChild(dropdownEl);
    svgEl.parentNode.removeChild(svgEl);
  });

  it('Should set settings', () => {
    const settings = {
      closeOnSelect: true,
      cssClass: null,
      delay: 300,
      empty: false,
      filterMode: 'contains',
      maxWidth: null,
      moveSelected: 'none',
      multiple: false,
      noSearch: false,
      placementOpts: null,
      reloadSourceOnOpen: false,
      showEmptyGroupHeaders: false,
      showSelectAll: false,
      sourceArguments: {}
    };

    expect(dropdownObj.settings).toEqual(settings);
  });

  it('Should update set settings via data', () => {
    const settings = {
      closeOnSelect: true,
      cssClass: null,
      delay: 2000,
      empty: false,
      filterMode: 'contains',
      maxWidth: 1000,
      moveSelected: 'none',
      multiple: false,
      noSearch: false,
      placementOpts: null,
      reloadSourceOnOpen: false,
      showEmptyGroupHeaders: false,
      showSelectAll: false,
      sourceArguments: {}
    };

    dropdownObj.updated();
    dropdownObj.settings.maxWidth = 1000;
    dropdownObj.settings.delay = 2000;

    expect(dropdownObj.settings).toEqual(settings);
  });

  it('Should update set settings via parameter', () => {
    const settings = {
      closeOnSelect: true,
      cssClass: null,
      delay: 2000,
      empty: false,
      filterMode: 'contains',
      maxWidth: 1000,
      moveSelected: 'none',
      multiple: false,
      noSearch: false,
      placementOpts: null,
      reloadSourceOnOpen: false,
      showEmptyGroupHeaders: false,
      showSelectAll: false,
      sourceArguments: {}
    };
    dropdownObj.updated(settings);

    expect(dropdownObj.settings).toEqual(settings);
  });

  it('Should trigger "has-updated" event', () => {
    const settings = {
      closeOnSelect: true,
      cssClass: null,
      delay: 2000,
      empty: false,
      filterMode: 'contains',
      maxWidth: 1000,
      moveSelected: 'none',
      multiple: false,
      noSearch: false,
      placementOpts: null,
      reloadSourceOnOpen: false,
      showEmptyGroupHeaders: false,
      showSelectAll: false,
      sourceArguments: {}
    };

    const spyEvent = spyOnEvent('.dropdown', 'has-updated');
    dropdownObj.updated(settings);

    expect(spyEvent).toHaveBeenTriggered();
  });
});
